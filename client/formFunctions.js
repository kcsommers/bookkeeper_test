export const setFormData = (type, data) => {
  let formFields = []
  let modelFields = []
  let miscData = {}
  let url = ''
  let formData = {}

  switch(type) {
    case 'note':
      url = 'http://localhost:3000/notes'
      formFields.push({
        field: 'content',
        placeholder: 'Note',
        value: ''
      })
      modelFields = [
        {
          type: 'userId',
          value: data.user.id
        }, 
        {
          type: 'bookId',
          value: data.book.id
        }
      ]
      break
    case 'quote':
      url = 'http://localhost:3000/quotes'
      formFields.push({
        field: 'content',
        placeholder: 'Quote',
        value: ''
      }, {
        field: 'page',
        placeholder: 'Page',
        value: ''
      })
      modelFields = [
        {
          type: 'userId',
          value: data.user.id
        }, 
        {
          type: 'bookId',
          value: data.book.id
        }
      ]
      break
    case 'club-search':
      url = 'httml://localhost:3000/clubs/topic'
      break
    case 'club-start':
      url = 'http://localhost:3000/clubs'
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
      url = 'http://localhost:3000/posts'
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
        value: data.userId
      });
      break;
  }
  formData.formFields = formFields
  formData.modelFields = modelFields
  formData.miscData = miscData
  formData.httpData = {
    url: url
  }

  return formData
}