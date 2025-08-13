export function validateTag(v: string) {
  const validTagPattern = /^(?:\.[a-zA-Z_][\w-]*|#[a-zA-Z_][\w-]*)$/;

  return (
    v === '' ||
    validTagPattern.test(v) ||
    'Tag must either be an id (#example), a class (.example)'
  );
}

export function isRequired(v: string) {
  return v.trim() !== '' || 'This field is required';
}
