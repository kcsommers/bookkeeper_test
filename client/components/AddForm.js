import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import axios from 'axios'

class AddForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(formData) {
    const url = formData.data.url
    let postData = {}
    formData.fields.forEach((field) => {
      postData[field.field] = field.value
    })
    if(formData.data.hasOwnProperty('ids')) {
      formData.data.ids.forEach((id) => {
        postData[id.type] = id.id
      })
    }
    const results = await axios.post(url, postData)
    return results.data
  }

  handleChange(value, field) {
    const fieldObj = this.state.data.fields.filter((obj) => obj.field === field)
    const index = this.state.data.fields.indexOf(fieldObj[0])
    const fields = this.state.data.fields.filter((obj) => obj.field !== field)

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
    const inputs = this.state.data.fields.map((field, i) => (
      <TextInput 
        placeholder={field.placeholder}
        placeholderTextColor="#fff"
        onChangeText={(text) => {this.handleChange(text, field.field)}}
        multiline={true}
        style={styles.input}
        key={i} />
    ))
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
    color: '#fff'
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

export default AddForm