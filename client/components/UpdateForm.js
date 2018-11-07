import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import axios from 'axios'
import ImageUpload from '../components/ImageUpload'

class UpdateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(formData) {
    const url = formData.httpData.url
    let postData = new FormData()
    let inputData = {}
    let modelData = {}
    formData.formFields.forEach((field) => {
      if(field.field === 'image' || field.field === 'banner') {
        let image = this.state.images.find((img) => img.type === field.field)
        let uriParts = image.uri.split('.')
        let fileType = uriParts[uriParts.length - 1]

        postData.append(field.field, {
          uri: image.uri,
          type: `image/${fileType}`,
          name: `image.${fileType}`
        })

      }
      else {
        inputData[field.field] = field.value;
      }
    })

    formData.modelFields.forEach((item) => {
      modelData[item.type] = item.value
    })

    postData.append('inputData', JSON.stringify(inputData))
    postData.append('modelData', JSON.stringify(modelData))
    postData.append('miscData', JSON.stringify(formData.miscData))

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }

    try {
      const results = await axios.post(url, postData, headers)
      console.log('AND WE BACK')
      return results.data
    }
    catch(err) {
      console.log('ERROR UPDATING ITEM', err)
    }
    





    // let postData = {}

    // formData.formFields.forEach((field) => {
    //   postData[field.field] = field.value
    // })

    // const data = {newData: postData, id: this.props.itemId}

    // try{
    //   const results = await axios.post(url, data)
    //   if(!results.data.err) {
    //     return data 
    //   }
    //   else {
    //     console.log("ERROR UPDATING ITEM", err)
    //   }
    // }
    // catch(err) {
    //   console.log('CAUGHT ERROR UPDATING ITEM', err)
    // }
  }

  handleChange(value, field) {
    const fieldObj = this.state.data.formFields.filter((obj) => obj.field === field)
    const index = this.state.data.formFields.indexOf(fieldObj[0])
    const fields = this.state.data.formFields.filter((obj) => obj.field !== field)

    fieldObj[0].value = value
    fields.splice(index, 0, fieldObj[0])

    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        fields: fields
      }
    }))
  } 

  render() {
    const inputs = this.state.data.formFields.map((field, i) => {
      if(field.field === 'image' || field.field === 'banner') {
        return (
          <ImageUpload 
            enpoint={field.endpoint}
            text={field.text}
            type={field.field}
            addImage={(image) => {this.addImageToState(image)}}
            key={i} />
        )
      }
      else {
        return (
          <TextInput 
            placeholder={field.placeholder}
            onChangeText={(text) => {this.handleChange(text, field.field)}}
            multiline={true}
            style={styles.input}
            key={i}
            value={field.value} />
        )
      }
    })
    return (
      <View>
        {inputs}
        <TouchableOpacity 
          style={styles.submitBtn} 
          onPress={() => {
            this.handleSubmit(this.state.data).then((data) => {
              this.props.onSubmit(data)
            })
          }}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 22,
    fontFamily: 'Merriweather',
    marginBottom: 10
  },
  input: {
    borderBottomColor: '#71a7a9',
    borderBottomWidth: 2,
    fontSize: 16,
    fontFamily: 'Merriweather',
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    color: '#444'
  },
  submitBtn: {
    backgroundColor: '#c13149',
    width: '50%',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  submitText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  }
})

export default UpdateForm