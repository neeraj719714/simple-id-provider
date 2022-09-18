interface TrieNode {
  char: string;
  wordCount: number;
  children: { [key: string]: TrieNode };
}

// TrieNode in JS
class TrieNode {
  constructor(char: string) {
    this.char = char;
    this.children = {};
    this.wordCount = 0;
  }
}

export default TrieNode;
