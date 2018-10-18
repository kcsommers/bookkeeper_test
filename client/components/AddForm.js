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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit() {
    const url = this.state.data.data.url
    let data = {}
    this.state.data.fields.forEach((field) => {
      data[field.field] = field.value
    })
    if(this.state.data.data.hasOwnProperty('ids')) {
      this.state.data.data.ids.forEach((id) => {
        data[id.type] = id.id
      })
    }

    const results = await axios.post(url, data)
    console.log(results.data)
  }

  handleChange(value, field) {
    const fieldObj = this.state.data.fields.filter((obj) => obj.field === field)
    const fields = this.state.data.fields.filter((obj) => obj.field !== field)

    fieldObj[0].value = value
    fields.push(fieldObj[0])

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
        onChangeText={(text) => {this.handleChange(text, field.field)}}
        multiline={true}
        style={styles.input}
        key={i} />
    ))
    return (
      <View>
        {inputs}
        <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmit}>
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
    marginBottom: 5
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