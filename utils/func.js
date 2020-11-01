export const getCurrentTime = (value) => {
  const d = new Date();

  if (value === 'time') {
    return d.toLocaleTimeString();
  } else if (value === 'date') {
    return d.toLocaleDateString();
  }

  return d;
};

export const formatPhoneNumber = (phone) => {
  var cleaned = ('' + phone).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
};
