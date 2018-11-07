import axios from 'axios'
import Environment from './environment'

export const setFormData = (type, data) => {
  let formFields = []
  let modelFields = []
  let miscData = {}
  let url = ''
  let formData = {}

  switch(type) {
    case 'user':
      url = `${Environment.BASE_URL}/users/update`
      formFields.push({
        field: 'username',
        placeholder: 'Username',
        value: data.user.username
      },
      {
        field: 'location',
        placeholder: 'Location',
        value: data.user.location
      },
      {
        field: 'image',
        enpoint: 'users',
        text: 'Select Profile Image'
      }, 
      {
        field: 'banner',
        endpoint: 'users',
        text: 'Select Banner Image'
      });
      
      miscData.userId = data.user.id
      break
    case 'list':
      url = `${Environment.BASE_URL}/lists`
      formFields.push({
        field: 'name',
        placeholder: 'List Name',
        value: ''
      })
      modelFields.push({
        type: 'userId',
        value: data.user.id
      })
      break
    case 'note':
      url = `${Environment.BASE_URL}/notes`
      formFields.push({
        field: 'content',
        placeholder: 'Note',
        value: ''
      })
      modelFields.push(
        {
          type: 'userId',
          value: data.user.id
        }, 
        {
          type: 'bookId',
          value: data.book.id
        }
      )
      break
    case 'quote':
      url = `${Environment.BASE_URL}/quotes`
      formFields.push({
        field: 'content',
        placeholder: 'Quote',
        value: ''
      }, {
        field: 'page',
        placeholder: 'Page',
        value: ''
      })
      modelFields.push(
        {
          type: 'userId',
          value: data.user.id
        }, 
        {
          type: 'bookId',
          value: data.book.id
        }
      )
      break
    case 'club-search':
      url = 'httml://localhost:3000/clubs/topic'
      break
    case 'club-start':
      url = `${Environment.BASE_URL}/clubs`
      formFields.push({
        field: 'name',
        placeholder: 'Group Name',
        value: ''
      },
      {
        field: 'description',
        placeholder: 'Group Description',
        value: ''
      },
      {
        field: 'topic',
        placeholder: 'Group Topic',
        value: data.book.title
      })

      modelFields.push({
        type: 'admin',
        value: data.user.username,
      }, 
      {
        type: 'imgUrl',
        value: ''
      }, 
      {
        type: 'bookImg',
        value: data.book.imgUrl
      })

      miscData.userId = data.user.id
      miscData.bookId = data.book.id
      break
    case 'post':
      url = `${Environment.BASE_URL}/posts`
      formFields.push({
        field: 'content',
        placeholder: 'Add Comment...',
        value: ''
      });
      
      modelFields.push({
        type: 'clubId',
        value: data.clubId
      }, 
      {
        type: 'userId',
        value: data.user.id
      });

      miscData.username = data.user.username
      break;
  }
  formData.formFields = formFields
  formData.modelFields = modelFields
  formData.miscData = miscData
  formData.httpData = {url}

  return formData
}

export const setUpdateFormData = (type, data) => {
  let formFields = []
  let modelFields = []
  let miscData = {}
  let url = ''
  let formData = {}

  switch(type) {
    case 'list':
      url = `${Environment.BASE_URL}/lists/update`
      formFields.push({
        field: 'name',
        placeholder: '',
        value: data.name
      });
      break;
    case 'book':
      url = `${Environment.BASE_URL}/books/update`
      formFields.push({
        field: 'description',
        placeholder: '',
        value: data.description
      },
      {
        field: 'banner',
        endpoint: 'books',
        text: 'Select Banner Image'
      });
      miscData.bookId = data.id;
      break;
    case 'note':
      url = `${Environment.BASE_URL}/notes/update`
      formFields.push({
        field: 'content',
        placeholder: '',
        value: data.content
      });
      break;
    case 'quote':
      url = `${Environment.BASE_URL}/quotes/update`
      formFields.push({
        field: 'content',
        placeholder: '',
        value: data.content
      },
      {
        field: 'page',
        placeholder: '',
        value: String(data.page)
      });
      break;
    case 'club':
      url = `${Environment.BASE_URL}/clubs/update`
      formFields.push({
        field: 'name',
        placeholder: '',
        value: data.name
      },
      {
        field: 'description',
        placeholder: '',
        value: data.description
      }, 
      {
        field: 'topic',
        placeholder: '',
        value: data.topic
      })
    case 'user':
      url = `${Environment.BASE_URL}/users/update`
      formFields.push({
        field: 'username',
        placeholder: '',
        value: data.username
      }, 
      {
        field: 'email',
        placeholder: '',
        value: data.email 
      });
  }

  formData.formFields = formFields;
  formData.modelFields = modelFields;
  formData.miscData = miscData;
  formData.httpData = {url};

  return formData;
}

export const handleDelete = async (data) => {
  const url = `http://localhost:3000/${data.endpoint}/${data.id}`
  const results = await axios.delete(url)
  return results.data
}