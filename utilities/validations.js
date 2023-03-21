module.exports.userValidation = (data) => {

  let validation = null;

  if (!data?.gender) {
    validation = 'gender';
  }
  else if (!data?.name) {
    validation = 'name';
  }
  else if (!data?.contact) {
    validation = 'contact';
  }
  else if (!data?.address) {
    validation = 'address';
  }
  else if (!data?.photoUrl) {
    validation = 'photoUrl';
  }

  return validation;
}