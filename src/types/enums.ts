export enum QueryOption {
  CREATE = 1,
  FINDBY,
  UPDATE,
  DELETE
}

export enum Content {
  ERROR = 'A problem occurred while trying to update the links',
  USERERROR = 'A problem occurred while trying to update the user',
  ADD = 'Link created successfully',
  EDIT = 'Link edited successfully',
  DELETE = 'Link deleted successfully',
  USERNAME = 'Username edited successfully'
}
