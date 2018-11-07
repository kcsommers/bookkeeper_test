import React from 'react'
import {
  Button,
  Image,
  View
} from 'react-native'
import axios from 'axios'
import {ImagePicker, Permissions} from 'expo'
import Environment from '../environment'


class ImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null
    }
  }

  _sendToServer = async () => {
    const url = `${Environment.BASE_URL}/${this.props.endpoint}/update`
    const uri = this.state.image
    const uriParts = uri.split('.')
    const fileType = uriParts[uriParts.length - 1]

    const formData = new FormData()
    formData.append('name', 'photo')
    formData.append('data', {
      uri,
      type: `image/${fileType}`,
      name: `photo.${fileType}`,
    })

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }

    const results = await axios.post(url, formData, headers)

    console.log(results.data)

  }

  _pickImage = async () => {
    const permissions = Permissions.CAMERA_ROLL
    const {status} = await Permissions.askAsync(permissions)

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if(!result.cancelled) {
      this.setState({ image: result.uri });
      console.log('IMAGE UPLOAD ABOUT TO ADD IMGAGE')
      this.props.addImage({type: this.props.type, uri: result.uri})
    }
  }

  render() {
    let image = this.state.image
    return (
      <View style={{
        flexDirection: 'row', 
        justifyContent: 'flex-start'
      }}>
        <Button
          title={this.props.text}
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    )
  }
}

export default ImageUpload