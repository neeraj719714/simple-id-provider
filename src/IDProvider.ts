import TrieNode from "./TrieNode.js";
import { isAlphaNumeric } from "./utils/isAlphaNumeric.js";

interface IDProvider {
  root: TrieNode;
  options: {
    caseSensitive: boolean;
    allowDuplicates: boolean;
    specialCharsAllowed: string;
  };
}

// implementation using trie data structure
class IDProvider {
  constructor() {
    this.root = new TrieNode("");
    this.options = {
      caseSensitive: false,
      allowDuplicates: true,
      specialCharsAllowed: "-",
    };
  }

  /**
   * @param {string} id the string id that is intended to be the id
   * @returns unique simple string concatenated to the id
   */
  getId(id: string): string {
    if (!id) {
      throw new Error("ID is required");
    }
    // if caseSensitive is false, convert id to lowercase
    if (!this.options.caseSensitive) {
      id = id.toLowerCase();
    }
    let wasPrevCharSpecial = true;
    let currentNode = this.root;
    let newId = "";
    // find the word in the trie and if not present insert it else increment the word count
    for (let i = 0; i < id.length; i++) {
      let char = id[i];
      const isCharSpecial = !isAlphaNumeric(char);
      const isCharAllowed = this.options.specialCharsAllowed.includes(char);

      // if char is special and not allowed, replace it with a - character
      if (isCharSpecial && !isCharAllowed) {
        if (i == 0 || i == id.length - 1 || wasPrevCharSpecial) continue;
        wasPrevCharSpecial = true;
        newId += "-";
      }
      // else if the char is allowed and wasPrevCharSpecial is false then add it to the newId
      else {
        wasPrevCharSpecial = false;
        newId += char;
      }

      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode(char);
      }
      currentNode = currentNode.children[char];
    }
    if (currentNode.wordCount > 0) {
      if (this.options.allowDuplicates) {
        currentNode.wordCount++;
        return `${newId}-${currentNode.wordCount - 1}`;
      } else {
        throw new Error(
          "ID already exists, if you want to allow duplicates, set allowDuplicates to true"
        );
      }
    } else {
      currentNode.wordCount++;
      return newId;
    }
  }
}

export default IDProvider;
