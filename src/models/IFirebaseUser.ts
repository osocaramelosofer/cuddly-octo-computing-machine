export default interface IFirebaseUser {
  email: string
  uid: string
  username: string
  displayName: string | null
  profilePicture: string | null
  photoURL: string
  firstName: string
  lastName: string
  home: string
  birthday: string | Date
  phoneNumber: string
}
