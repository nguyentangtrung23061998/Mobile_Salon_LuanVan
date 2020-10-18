export const getErrorFromKey = (message, key) => {
  const msg = message[key];

  if (msg) {
    return msg;
  }
  return null;
};
