function verifyEmail(email) {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialCharacters = '@.';
  const availableCharacters = letters + numbers + specialCharacters;

  if (email.split('@')[0].length < 6) return false;

  if (email.split('@')[0].length >= 8) {
    let count = 0;
    for (let i = 0; i < email.split('@')[0].length; i++) {
      if (!letters.includes(email.split('@')[0].charAt(i))) count += 1;
    }
    if (count == email.split('@')[0].length) return false;
  }

  if (
    /(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      email.split('@')[1]
    ) == false
  )
    return false;

  let count = 0;
  for (let i = 0; i < email.length; i++) {
    if (availableCharacters.includes(email.charAt(i))) count += 1;
  }
  if (email.length > count) return false;
  return true;
}

module.exports = { verifyEmail };
