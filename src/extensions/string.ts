interface String {
  clean(): string;
}

String.prototype.clean = function (): string {
  let noWhitespace = this.replace(/\s/g, '');
  let trimmed = noWhitespace.trim();
  let lowercase = trimmed.toLowerCase();
  let noSpecialChars = lowercase.replace(/[^a-zA-Z0-9]/g, '');
  return noSpecialChars;
};
