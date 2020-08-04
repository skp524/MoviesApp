export const MovieSchema = {
  name: 'Movies',
  primaryKey: 'name',
  properties:
  {
    name: 'string',
    genre: 'string',
    description: 'string',
    imageURI: 'string'
  }
}
export const UserSchema = {
  name: 'Users',
  primaryKey: 'emailId',
  properties:
  {
    name: 'string',
    emailId: 'string',
    password: 'string',
    role: 'int',
    status: 'int'

  }
}