export const PROBLEMS = {
  "practice-freely": {
    id: "practice-freely",
    title: "Practice Freely",
    difficulty: "Open",
    category: "Open Practice • Sandbox",
    mode: "freestyle",
    description: {
      text: "Use this space to practice any coding idea you want. There are no predefined test cases or expected outputs in this mode.",
      notes: [
        "Choose a language, write your code, and run it to see real execution output.",
        "This mode is perfect for revising syntax, trying algorithms, or preparing custom interview questions.",
      ],
    },
    practiceIdeas: [
      "Implement stack, queue, or linked list from scratch.",
      "Solve a custom recursion or dynamic programming problem.",
      "Practice string parsing and edge-case handling.",
      "Try your own mock interview question and validate with print statements.",
    ],
    examples: [],
    constraints: [],
    starterCode: {
      javascript: `// Freestyle mode: practice anything you want.
// Example:
// function solve() {
//   console.log("Hello, InterviewApex!");
// }
// solve();

`,
      python: `# Freestyle mode: practice anything you want.
# Example:
# def solve():
#     print("Hello, InterviewApex!")
#
# solve()

`,
      java: `// Freestyle mode: practice anything you want.
// Example:
// class Main {
//     public static void main(String[] args) {
//         System.out.println("Hello, InterviewApex!");
//     }
// }

`,
    },
  },

  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,
      python: `def twoSum(nums, target):
    # Write your solution here
    pass

# Test cases
print(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(twoSum([3, 2, 4], 6))  # Expected: [1, 2]
print(twoSum([3, 3], 6))  # Expected: [0, 1]`,
      java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9))); // Expected: [0, 1]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6))); // Expected: [1, 2]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 3}, 6))); // Expected: [0, 1]
    }
}`,
    },
    expectedOutput: {
      javascript: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
    },
  },

  "reverse-string": {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Write a function that reverses a string. The input string is given as an array of characters s.",
      notes: [
        "You must do this by modifying the input array in-place with O(1) extra memory.",
      ],
    },
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
    starterCode: {
      javascript: `function reverseString(s) {
  // Write your solution here
  
}

// Test cases
let test1 = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1); // Expected: ["o","l","l","e","h"]

let test2 = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(test2); // Expected: ["h","a","n","n","a","H"]`,
      python: `def reverseString(s):
    # Write your solution here
    pass

# Test cases
test1 = ["h","e","l","l","o"]
reverseString(test1)
print(test1)  # Expected: ["o","l","l","e","h"]

test2 = ["H","a","n","n","a","h"]
reverseString(test2)
print(test2)  # Expected: ["h","a","n","n","a","H"]`,
      java: `import java.util.*;

class Solution {
    public static void reverseString(char[] s) {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        char[] test1 = {'h','e','l','l','o'};
        reverseString(test1);
        System.out.println(Arrays.toString(test1)); // Expected: [o, l, l, e, h]
        
        char[] test2 = {'H','a','n','n','a','h'};
        reverseString(test2);
        System.out.println(Arrays.toString(test2)); // Expected: [h, a, n, n, a, H]
    }
}`,
    },
    expectedOutput: {
      javascript: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
      python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
      java: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
    },
  },

  "valid-palindrome": {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.",
      notes: [
        "Given a string s, return true if it is a palindrome, or false otherwise.",
      ],
    },
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
      {
        input: 's = " "',
        output: "true",
        explanation:
          's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 2 * 10⁵",
      "s consists only of printable ASCII characters",
    ],
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Write your solution here
  
}

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
console.log(isPalindrome("race a car")); // Expected: false
console.log(isPalindrome(" ")); // Expected: true`,
      python: `def isPalindrome(s):
    # Write your solution here
    pass

# Test cases
print(isPalindrome("A man, a plan, a canal: Panama"))  # Expected: True
print(isPalindrome("race a car"))  # Expected: False
print(isPalindrome(" "))  # Expected: True`,
      java: `class Solution {
    public static boolean isPalindrome(String s) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
        System.out.println(isPalindrome("race a car")); // Expected: false
        System.out.println(isPalindrome(" ")); // Expected: true
    }
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
    },
  },

  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1.",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Write your solution here
  
}

// Test cases
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Expected: 6
console.log(maxSubArray([1])); // Expected: 1
console.log(maxSubArray([5,4,-1,7,8])); // Expected: 23`,
      python: `def maxSubArray(nums):
    # Write your solution here
    pass

# Test cases
print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 6
print(maxSubArray([1]))  # Expected: 1
print(maxSubArray([5,4,-1,7,8]))  # Expected: 23`,
      java: `class Solution {
    public static int maxSubArray(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4})); // Expected: 6
        System.out.println(maxSubArray(new int[]{1})); // Expected: 1
        System.out.println(maxSubArray(new int[]{5,4,-1,7,8})); // Expected: 23
    }
}`,
    },
    expectedOutput: {
      javascript: "6\n1\n23",
      python: "6\n1\n23",
      java: "6\n1\n23",
    },
  },

  "container-with-most-water": {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
      notes: [
        "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        "Return the maximum amount of water a container can store.",
        "Notice that you may not slant the container.",
      ],
    },
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
      },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxArea(height) {
  // Write your solution here
  
}

// Test cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected: 49
console.log(maxArea([1,1])); // Expected: 1`,
      python: `def maxArea(height):
    # Write your solution here
    pass

# Test cases
print(maxArea([1,8,6,2,5,4,8,3,7]))  # Expected: 49
print(maxArea([1,1]))  # Expected: 1`,
      java: `class Solution {
    public static int maxArea(int[] height) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7})); // Expected: 49
        System.out.println(maxArea(new int[]{1,1})); // Expected: 1
    }
}`,
    },
    expectedOutput: {
      javascript: "49\n1",
      python: "49\n1",
      java: "49\n1",
    },
  },

  "best-time-to-buy-and-sell-stock": {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array • Greedy",
    description: {
      text: "Given an array prices where prices[i] is the price of a stock on the ith day, maximize your profit by choosing one day to buy and a different later day to sell.",
      notes: ["Return 0 if no profit is possible."],
    },
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
      },
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    starterCode: {
      javascript: `function maxProfit(prices) {
  // Write your solution here
  
}

console.log(maxProfit([7,1,5,3,6,4])); // Expected: 5
console.log(maxProfit([7,6,4,3,1])); // Expected: 0
console.log(maxProfit([2,4,1])); // Expected: 2`,
      python: `def maxProfit(prices):
    # Write your solution here
    pass

print(maxProfit([7,1,5,3,6,4]))  # Expected: 5
print(maxProfit([7,6,4,3,1]))  # Expected: 0
print(maxProfit([2,4,1]))  # Expected: 2`,
      java: `class Solution {
    public static int maxProfit(int[] prices) {
        // Write your solution here
        
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(maxProfit(new int[]{7,1,5,3,6,4})); // Expected: 5
        System.out.println(maxProfit(new int[]{7,6,4,3,1})); // Expected: 0
        System.out.println(maxProfit(new int[]{2,4,1})); // Expected: 2
    }
}`,
    },
    expectedOutput: {
      javascript: "5\n0\n2",
      python: "5\n0\n2",
      java: "5\n0\n2",
    },
  },

  "valid-anagram": {
    id: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "String • Hash Table",
    description: {
      text: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
      notes: [],
    },
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" },
    ],
    constraints: ["1 <= s.length, t.length <= 5 * 10^4"],
    starterCode: {
      javascript: `function isAnagram(s, t) {
  // Write your solution here
  
}

console.log(isAnagram("anagram", "nagaram")); // Expected: true
console.log(isAnagram("rat", "car")); // Expected: false
console.log(isAnagram("a", "ab")); // Expected: false`,
      python: `def isAnagram(s, t):
    # Write your solution here
    pass

print(isAnagram("anagram", "nagaram"))  # Expected: True
print(isAnagram("rat", "car"))  # Expected: False
print(isAnagram("a", "ab"))  # Expected: False`,
      java: `class Solution {
    public static boolean isAnagram(String s, String t) {
        // Write your solution here
        
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("anagram", "nagaram")); // Expected: true
        System.out.println(isAnagram("rat", "car")); // Expected: false
        System.out.println(isAnagram("a", "ab")); // Expected: false
    }
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\nfalse",
      python: "True\nFalse\nFalse",
      java: "true\nfalse\nfalse",
    },
  },

  "product-of-array-except-self": {
    id: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Array • Prefix/Suffix",
    description: {
      text: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
      notes: ["Do not use division.", "Solve in O(n) time."],
    },
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
    ],
    constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30"],
    starterCode: {
      javascript: `function productExceptSelf(nums) {
  // Write your solution here
  
}

console.log(productExceptSelf([1,2,3,4])); // Expected: [24,12,8,6]
console.log(productExceptSelf([-1,1,0,-3,3])); // Expected: [0,0,9,0,0]`,
      python: `def productExceptSelf(nums):
    # Write your solution here
    pass

print(productExceptSelf([1,2,3,4]))  # Expected: [24,12,8,6]
print(productExceptSelf([-1,1,0,-3,3]))  # Expected: [0,0,9,0,0]`,
      java: `import java.util.*;

class Solution {
    public static int[] productExceptSelf(int[] nums) {
        // Write your solution here
        
        return new int[0];
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(productExceptSelf(new int[]{1,2,3,4}))); // Expected: [24, 12, 8, 6]
        System.out.println(Arrays.toString(productExceptSelf(new int[]{-1,1,0,-3,3}))); // Expected: [0, 0, 9, 0, 0]
    }
}`,
    },
    expectedOutput: {
      javascript: "[24,12,8,6]\n[0,0,9,0,0]",
      python: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]",
      java: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]",
    },
  },

  "3sum": {
    id: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "Given an integer array nums, return all the unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
      notes: ["The solution set must not contain duplicate triplets."],
    },
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
      },
      { input: "nums = [0,1,1]", output: "[]" },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" },
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    starterCode: {
      javascript: `function threeSum(nums) {
  // Write your solution here
  
}

console.log(JSON.stringify(threeSum([-1,0,1,2,-1,-4]))); // Expected: [[-1,-1,2],[-1,0,1]]
console.log(JSON.stringify(threeSum([0,1,1]))); // Expected: []
console.log(JSON.stringify(threeSum([0,0,0]))); // Expected: [[0,0,0]]`,
      python: `def threeSum(nums):
    # Write your solution here
    pass

print(threeSum([-1,0,1,2,-1,-4]))  # Expected: [[-1, -1, 2], [-1, 0, 1]]
print(threeSum([0,1,1]))  # Expected: []
print(threeSum([0,0,0]))  # Expected: [[0, 0, 0]]`,
      java: `import java.util.*;

class Solution {
    public static List<List<Integer>> threeSum(int[] nums) {
        // Write your solution here
        
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        System.out.println(threeSum(new int[]{-1,0,1,2,-1,-4})); // Expected: [[-1, -1, 2], [-1, 0, 1]]
        System.out.println(threeSum(new int[]{0,1,1})); // Expected: []
        System.out.println(threeSum(new int[]{0,0,0})); // Expected: [[0, 0, 0]]
    }
}`,
    },
    expectedOutput: {
      javascript: "[[-1,-1,2],[-1,0,1]]\n[]\n[[0,0,0]]",
      python: "[[-1, -1, 2], [-1, 0, 1]]\n[]\n[[0, 0, 0]]",
      java: "[[-1, -1, 2], [-1, 0, 1]]\n[]\n[[0, 0, 0]]",
    },
  },

  "longest-substring-without-repeating-characters": {
    id: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String • Sliding Window",
    description: {
      text: "Given a string s, find the length of the longest substring without repeating characters.",
      notes: [],
    },
    examples: [
      { input: 's = "abcabcbb"', output: "3" },
      { input: 's = "bbbbb"', output: "1" },
      { input: 's = "pwwkew"', output: "3" },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4"],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  
}

console.log(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
console.log(lengthOfLongestSubstring("bbbbb")); // Expected: 1
console.log(lengthOfLongestSubstring("pwwkew")); // Expected: 3`,
      python: `def lengthOfLongestSubstring(s):
    # Write your solution here
    pass

print(lengthOfLongestSubstring("abcabcbb"))  # Expected: 3
print(lengthOfLongestSubstring("bbbbb"))  # Expected: 1
print(lengthOfLongestSubstring("pwwkew"))  # Expected: 3`,
      java: `class Solution {
    public static int lengthOfLongestSubstring(String s) {
        // Write your solution here
        
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
        System.out.println(lengthOfLongestSubstring("bbbbb")); // Expected: 1
        System.out.println(lengthOfLongestSubstring("pwwkew")); // Expected: 3
    }
}`,
    },
    expectedOutput: {
      javascript: "3\n1\n3",
      python: "3\n1\n3",
      java: "3\n1\n3",
    },
  },

  "trapping-rain-water": {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Array • Two Pointers",
    description: {
      text: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      notes: [],
    },
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" },
    ],
    constraints: ["1 <= height.length <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    starterCode: {
      javascript: `function trap(height) {
  // Write your solution here
  
}

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // Expected: 6
console.log(trap([4,2,0,3,2,5])); // Expected: 9`,
      python: `def trap(height):
    # Write your solution here
    pass

print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))  # Expected: 6
print(trap([4,2,0,3,2,5]))  # Expected: 9`,
      java: `class Solution {
    public static int trap(int[] height) {
        // Write your solution here
        
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1})); // Expected: 6
        System.out.println(trap(new int[]{4,2,0,3,2,5})); // Expected: 9
    }
}`,
    },
    expectedOutput: {
      javascript: "6\n9",
      python: "6\n9",
      java: "6\n9",
    },
  },

  "median-of-two-sorted-arrays": {
    id: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Array • Binary Search",
    description: {
      text: "Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.",
      notes: ["Overall run time complexity should be O(log (m+n))."],
    },
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.0" },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5" },
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m, n <= 1000",
    ],
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  // Write your solution here
  
}

console.log(findMedianSortedArrays([1,3],[2])); // Expected: 2
console.log(findMedianSortedArrays([1,2],[3,4])); // Expected: 2.5`,
      python: `def findMedianSortedArrays(nums1, nums2):
    # Write your solution here
    pass

print(findMedianSortedArrays([1,3],[2]))  # Expected: 2.0
print(findMedianSortedArrays([1,2],[3,4]))  # Expected: 2.5`,
      java: `class Solution {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your solution here
        
        return 0.0;
    }

    public static void main(String[] args) {
        System.out.println(findMedianSortedArrays(new int[]{1,3}, new int[]{2})); // Expected: 2.0
        System.out.println(findMedianSortedArrays(new int[]{1,2}, new int[]{3,4})); // Expected: 2.5
    }
}`,
    },
    expectedOutput: {
      javascript: "2\n2.5",
      python: "2\n2.5",
      java: "2.0\n2.5",
    },
  },

  "minimum-window-substring": {
    id: "minimum-window-substring",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    category: "String • Sliding Window",
    description: {
      text: "Given two strings s and t, return the minimum window substring of s such that every character in t is included in the window.",
      notes: ["If there is no such substring, return an empty string."],
    },
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""' },
    ],
    constraints: ["1 <= s.length, t.length <= 10^5"],
    starterCode: {
      javascript: `function minWindow(s, t) {
  // Write your solution here
  
}

console.log(minWindow("ADOBECODEBANC", "ABC")); // Expected: BANC
console.log(minWindow("a", "a")); // Expected: a
console.log(minWindow("a", "aa")); // Expected: ""`,
      python: `def minWindow(s, t):
    # Write your solution here
    pass

print(minWindow("ADOBECODEBANC", "ABC"))  # Expected: BANC
print(minWindow("a", "a"))  # Expected: a
print(minWindow("a", "aa"))  # Expected: ""`,
      java: `class Solution {
    public static String minWindow(String s, String t) {
        // Write your solution here
        
        return "";
    }

    public static void main(String[] args) {
        System.out.println(minWindow("ADOBECODEBANC", "ABC")); // Expected: BANC
        System.out.println(minWindow("a", "a")); // Expected: a
        System.out.println(minWindow("a", "aa")); // Expected: ""
    }
}`,
    },
    expectedOutput: {
      javascript: "BANC\na",
      python: "BANC\na",
      java: "BANC\na",
    },
  },

  "longest-valid-parentheses": {
    id: "longest-valid-parentheses",
    title: "Longest Valid Parentheses",
    difficulty: "Hard",
    category: "String • Stack • Dynamic Programming",
    description: {
      text: "Given a string containing just the characters '(' and ')', return the length of the longest valid parentheses substring.",
      notes: [],
    },
    examples: [
      { input: 's = "(()"', output: "2" },
      { input: 's = ")()())"', output: "4" },
      { input: 's = ""', output: "0" },
    ],
    constraints: ["0 <= s.length <= 3 * 10^4"],
    starterCode: {
      javascript: `function longestValidParentheses(s) {
  // Write your solution here
  
}

console.log(longestValidParentheses("(()")); // Expected: 2
console.log(longestValidParentheses(")()())")); // Expected: 4
console.log(longestValidParentheses("")); // Expected: 0`,
      python: `def longestValidParentheses(s):
    # Write your solution here
    pass

print(longestValidParentheses("(()"))  # Expected: 2
print(longestValidParentheses(")()())"))  # Expected: 4
print(longestValidParentheses(""))  # Expected: 0`,
      java: `class Solution {
    public static int longestValidParentheses(String s) {
        // Write your solution here
        
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(longestValidParentheses("(()")); // Expected: 2
        System.out.println(longestValidParentheses(")()())")); // Expected: 4
        System.out.println(longestValidParentheses("")); // Expected: 0
    }
}`,
    },
    expectedOutput: {
      javascript: "2\n4\n0",
      python: "2\n4\n0",
      java: "2\n4\n0",
    },
  },

  "first-missing-positive": {
    id: "first-missing-positive",
    title: "First Missing Positive",
    difficulty: "Hard",
    category: "Array • In-Place Hashing",
    description: {
      text: "Given an unsorted integer array nums, return the smallest missing positive integer.",
      notes: [
        "You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.",
      ],
    },
    examples: [
      { input: "nums = [1,2,0]", output: "3" },
      { input: "nums = [3,4,-1,1]", output: "2" },
      { input: "nums = [7,8,9,11,12]", output: "1" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-2^31 <= nums[i] <= 2^31 - 1"],
    starterCode: {
      javascript: `function firstMissingPositive(nums) {
  // Write your solution here
  
}

console.log(firstMissingPositive([1,2,0])); // Expected: 3
console.log(firstMissingPositive([3,4,-1,1])); // Expected: 2
console.log(firstMissingPositive([7,8,9,11,12])); // Expected: 1`,
      python: `def firstMissingPositive(nums):
    # Write your solution here
    pass

print(firstMissingPositive([1,2,0]))  # Expected: 3
print(firstMissingPositive([3,4,-1,1]))  # Expected: 2
print(firstMissingPositive([7,8,9,11,12]))  # Expected: 1`,
      java: `class Solution {
    public static int firstMissingPositive(int[] nums) {
        // Write your solution here
        
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(firstMissingPositive(new int[]{1,2,0})); // Expected: 3
        System.out.println(firstMissingPositive(new int[]{3,4,-1,1})); // Expected: 2
        System.out.println(firstMissingPositive(new int[]{7,8,9,11,12})); // Expected: 1
    }
}`,
    },
    expectedOutput: {
      javascript: "3\n2\n1",
      python: "3\n2\n1",
      java: "3\n2\n1",
    },
  },

  "valid-parentheses": {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack • String",
    description: {
      text: "Given a string containing only brackets, determine if it is valid.",
      notes: [
        "An input string is valid if brackets are closed in the correct order.",
      ],
    },
    examples: [
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 10^4"],
    starterCode: {
      javascript: `function isValid(s) {
  // Write your solution here
}

console.log(isValid("()[]{}")); // Expected: true
console.log(isValid("(]")); // Expected: false
console.log(isValid("([{}])")); // Expected: true`,
      python: `def isValid(s):
    # Write your solution here
    pass

print(isValid("()[]{}"))  # Expected: True
print(isValid("(]"))  # Expected: False
print(isValid("([{}])"))  # Expected: True`,
      java: `class Solution {
    public static boolean isValid(String s) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isValid("()[]{}")); // Expected: true
        System.out.println(isValid("(]")); // Expected: false
        System.out.println(isValid("([{}])")); // Expected: true
    }
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
    },
  },

  "daily-temperatures": {
    id: "daily-temperatures",
    title: "Daily Temperatures",
    difficulty: "Medium",
    category: "Stack • Array",
    description: {
      text: "For each day, return how many days you have to wait until a warmer temperature.",
      notes: [],
    },
    examples: [
      {
        input: "temperatures = [73,74,75,71,69,72,76,73]",
        output: "[1,1,4,2,1,1,0,0]",
      },
      { input: "temperatures = [30,40,50,60]", output: "[1,1,1,0]" },
    ],
    constraints: ["1 <= temperatures.length <= 10^5"],
    starterCode: {
      javascript: `function dailyTemperatures(temperatures) {
  // Write your solution here
}

console.log(dailyTemperatures([73,74,75,71,69,72,76,73])); // Expected: [1,1,4,2,1,1,0,0]
console.log(dailyTemperatures([30,40,50,60])); // Expected: [1,1,1,0]`,
      python: `def dailyTemperatures(temperatures):
    # Write your solution here
    pass

print(dailyTemperatures([73,74,75,71,69,72,76,73]))  # Expected: [1,1,4,2,1,1,0,0]
print(dailyTemperatures([30,40,50,60]))  # Expected: [1,1,1,0]`,
      java: `import java.util.*;

class Solution {
    public static int[] dailyTemperatures(int[] temperatures) {
        // Write your solution here
        return new int[0];
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(dailyTemperatures(new int[]{73,74,75,71,69,72,76,73}))); // Expected: [1, 1, 4, 2, 1, 1, 0, 0]
        System.out.println(Arrays.toString(dailyTemperatures(new int[]{30,40,50,60}))); // Expected: [1, 1, 1, 0]
    }
}`,
    },
    expectedOutput: {
      javascript: "[1,1,4,2,1,1,0,0]\n[1,1,1,0]",
      python: "[1, 1, 4, 2, 1, 1, 0, 0]\n[1, 1, 1, 0]",
      java: "[1, 1, 4, 2, 1, 1, 0, 0]\n[1, 1, 1, 0]",
    },
  },

  "min-stack": {
    id: "min-stack",
    title: "Min Stack",
    difficulty: "Medium",
    category: "Stack • Design",
    description: {
      text: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
      notes: [],
    },
    examples: [{ input: "operations sequence", output: "0\n0\n2" }],
    constraints: ["At most 3 * 10^4 calls will be made"],
    starterCode: {
      javascript: `class MinStack {
  // Write your solution here
}

const s = new MinStack();
s.push(-2); s.push(0); s.push(-3);
console.log(s.getMin()); // Expected: -3
s.pop();
console.log(s.top()); // Expected: 0
console.log(s.getMin()); // Expected: -2`,
      python: `class MinStack:
    # Write your solution here
    pass

s = MinStack()
s.push(-2); s.push(0); s.push(-3)
print(s.getMin())  # Expected: -3
s.pop()
print(s.top())  # Expected: 0
print(s.getMin())  # Expected: -2`,
      java: `class MinStack {
    // Write your solution here
}

class Solution {
    public static void main(String[] args) {
        MinStack s = new MinStack();
        s.push(-2); s.push(0); s.push(-3);
        System.out.println(s.getMin()); // Expected: -3
        s.pop();
        System.out.println(s.top()); // Expected: 0
        System.out.println(s.getMin()); // Expected: -2
    }
}`,
    },
    expectedOutput: {
      javascript: "-3\n0\n-2",
      python: "-3\n0\n-2",
      java: "-3\n0\n-2",
    },
  },

  "implement-queue-using-stacks": {
    id: "implement-queue-using-stacks",
    title: "Implement Queue using Stacks",
    difficulty: "Easy",
    category: "Queue • Stack • Design",
    description: {
      text: "Implement a first in first out queue using only two stacks.",
      notes: [],
    },
    examples: [{ input: "operations sequence", output: "1\n1\nfalse" }],
    constraints: ["1 <= number of operations <= 100"],
    starterCode: {
      javascript: `class MyQueue {
  // Write your solution here
}

const q = new MyQueue();
q.push(1); q.push(2);
console.log(q.peek()); // Expected: 1
console.log(q.pop()); // Expected: 1
console.log(q.empty()); // Expected: false`,
      python: `class MyQueue:
    # Write your solution here
    pass

q = MyQueue()
q.push(1); q.push(2)
print(q.peek())  # Expected: 1
print(q.pop())  # Expected: 1
print(q.empty())  # Expected: False`,
      java: `class MyQueue {
    // Write your solution here
}

class Solution {
    public static void main(String[] args) {
        MyQueue q = new MyQueue();
        q.push(1); q.push(2);
        System.out.println(q.peek()); // Expected: 1
        System.out.println(q.pop()); // Expected: 1
        System.out.println(q.empty()); // Expected: false
    }
}`,
    },
    expectedOutput: {
      javascript: "1\n1\nfalse",
      python: "1\n1\nFalse",
      java: "1\n1\nfalse",
    },
  },

  "number-of-recent-calls": {
    id: "number-of-recent-calls",
    title: "Number of Recent Calls",
    difficulty: "Easy",
    category: "Queue • Sliding Window",
    description: {
      text: "Implement a RecentCounter class to count requests within the last 3000 milliseconds.",
      notes: [],
    },
    examples: [{ input: "ping sequence", output: "1\n2\n3\n3" }],
    constraints: ["At most 10^4 calls"],
    starterCode: {
      javascript: `class RecentCounter {
  // Write your solution here
}

const r = new RecentCounter();
console.log(r.ping(1));
console.log(r.ping(100));
console.log(r.ping(3001));
console.log(r.ping(3002));`,
      python: `class RecentCounter:
    # Write your solution here
    pass

r = RecentCounter()
print(r.ping(1))
print(r.ping(100))
print(r.ping(3001))
print(r.ping(3002))`,
      java: `class RecentCounter {
    // Write your solution here
}

class Solution {
    public static void main(String[] args) {
        RecentCounter r = new RecentCounter();
        System.out.println(r.ping(1));
        System.out.println(r.ping(100));
        System.out.println(r.ping(3001));
        System.out.println(r.ping(3002));
    }
}`,
    },
    expectedOutput: {
      javascript: "1\n2\n3\n3",
      python: "1\n2\n3\n3",
      java: "1\n2\n3\n3",
    },
  },

  "moving-average-from-data-stream": {
    id: "moving-average-from-data-stream",
    title: "Moving Average from Data Stream",
    difficulty: "Easy",
    category: "Queue • Design",
    description: {
      text: "Calculate moving averages with a fixed-size sliding window from a data stream.",
      notes: [],
    },
    examples: [
      { input: "size=3, values=1,10,3,5", output: "1\n5.5\n4.6666666667\n6" },
    ],
    constraints: ["1 <= size <= 1000"],
    starterCode: {
      javascript: `class MovingAverage {
  // Write your solution here
}

const m = new MovingAverage(3);
console.log(m.next(1));
console.log(m.next(10));
console.log(m.next(3));
console.log(m.next(5));`,
      python: `class MovingAverage:
    # Write your solution here
    pass

m = MovingAverage(3)
print(m.next(1))
print(m.next(10))
print(m.next(3))
print(m.next(5))`,
      java: `class MovingAverage {
    // Write your solution here
}

class Solution {
    public static void main(String[] args) {
        MovingAverage m = new MovingAverage(3);
        System.out.println(m.next(1));
        System.out.println(m.next(10));
        System.out.println(m.next(3));
        System.out.println(m.next(5));
    }
}`,
    },
    expectedOutput: {
      javascript: "1\n5.5\n4.666666666666667\n6",
      python: "1\n5.5\n4.666666666666667\n6.0",
      java: "1.0\n5.5\n4.666666666666667\n6.0",
    },
  },

  "reverse-linked-list": {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    description: {
      text: "Reverse a singly linked list and return the new head.",
      notes: [],
    },
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
    ],
    constraints: ["The number of nodes is in the range [0, 5000]"],
    starterCode: {
      javascript: `function reverseList(values) {
  // Write your solution here for array simulation
}

console.log(reverseList([1,2,3,4,5])); // Expected: [5,4,3,2,1]
console.log(reverseList([1,2])); // Expected: [2,1]`,
      python: `def reverseList(values):
    # Write your solution here for array simulation
    pass

print(reverseList([1,2,3,4,5]))  # Expected: [5,4,3,2,1]
print(reverseList([1,2]))  # Expected: [2,1]`,
      java: `import java.util.*;

class Solution {
    public static List<Integer> reverseList(List<Integer> values) {
        // Write your solution here for array simulation
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        System.out.println(reverseList(Arrays.asList(1,2,3,4,5))); // Expected: [5, 4, 3, 2, 1]
        System.out.println(reverseList(Arrays.asList(1,2))); // Expected: [2, 1]
    }
}`,
    },
    expectedOutput: {
      javascript: "[5,4,3,2,1]\n[2,1]",
      python: "[5, 4, 3, 2, 1]\n[2, 1]",
      java: "[5, 4, 3, 2, 1]\n[2, 1]",
    },
  },

  "middle-of-linked-list": {
    id: "middle-of-linked-list",
    title: "Middle of the Linked List",
    difficulty: "Easy",
    category: "Linked List • Two Pointers",
    description: {
      text: "Given the head of a singly linked list, return the middle node.",
      notes: ["If there are two middle nodes, return the second middle node."],
    },
    examples: [
      { input: "head = [1,2,3,4,5]", output: "3" },
      { input: "head = [1,2,3,4,5,6]", output: "4" },
    ],
    constraints: ["The number of nodes is in the range [1, 100]"],
    starterCode: {
      javascript: `function middleValue(values) {
  // Write your solution here for array simulation
}

console.log(middleValue([1,2,3,4,5])); // Expected: 3
console.log(middleValue([1,2,3,4,5,6])); // Expected: 4`,
      python: `def middleValue(values):
    # Write your solution here for array simulation
    pass

print(middleValue([1,2,3,4,5]))  # Expected: 3
print(middleValue([1,2,3,4,5,6]))  # Expected: 4`,
      java: `import java.util.*;

class Solution {
    public static int middleValue(List<Integer> values) {
        // Write your solution here for array simulation
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(middleValue(Arrays.asList(1,2,3,4,5))); // Expected: 3
        System.out.println(middleValue(Arrays.asList(1,2,3,4,5,6))); // Expected: 4
    }
}`,
    },
    expectedOutput: {
      javascript: "3\n4",
      python: "3\n4",
      java: "3\n4",
    },
  },

  "maximum-depth-of-binary-tree": {
    id: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Tree • Graph • DFS",
    description: {
      text: "Given the root of a binary tree, return its maximum depth.",
      notes: [],
    },
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
    constraints: ["The number of nodes is in the range [0, 10^4]"],
    starterCode: {
      javascript: `function maxDepthFromArray(levelOrder) {
  // Write your solution here for array-based tree simulation
}

console.log(maxDepthFromArray([3,9,20,null,null,15,7])); // Expected: 3
console.log(maxDepthFromArray([1,null,2])); // Expected: 2`,
      python: `def maxDepthFromArray(levelOrder):
    # Write your solution here for array-based tree simulation
    pass

print(maxDepthFromArray([3,9,20,None,None,15,7]))  # Expected: 3
print(maxDepthFromArray([1,None,2]))  # Expected: 2`,
      java: `class Solution {
    public static int maxDepthFromArray(Integer[] levelOrder) {
        // Write your solution here for array-based tree simulation
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(maxDepthFromArray(new Integer[]{3,9,20,null,null,15,7})); // Expected: 3
        System.out.println(maxDepthFromArray(new Integer[]{1,null,2})); // Expected: 2
    }
}`,
    },
    expectedOutput: {
      javascript: "3\n2",
      python: "3\n2",
      java: "3\n2",
    },
  },

  "binary-search": {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Array • Binary Search",
    description: {
      text: "Given a sorted array of integers and a target, return the index if target is found, otherwise return -1.",
      notes: [],
    },
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
    ],
    constraints: ["1 <= nums.length <= 10^4"],
    starterCode: {
      javascript: `function search(nums, target) {
  // Write your solution here
}

console.log(search([-1,0,3,5,9,12], 9)); // Expected: 4
console.log(search([-1,0,3,5,9,12], 2)); // Expected: -1`,
      python: `def search(nums, target):
    # Write your solution here
    pass

print(search([-1,0,3,5,9,12], 9))  # Expected: 4
print(search([-1,0,3,5,9,12], 2))  # Expected: -1`,
      java: `class Solution {
    public static int search(int[] nums, int target) {
        // Write your solution here
        return -1;
    }

    public static void main(String[] args) {
        System.out.println(search(new int[]{-1,0,3,5,9,12}, 9)); // Expected: 4
        System.out.println(search(new int[]{-1,0,3,5,9,12}, 2)); // Expected: -1
    }
}`,
    },
    expectedOutput: {
      javascript: "4\n-1",
      python: "4\n-1",
      java: "4\n-1",
    },
  },

  "next-greater-element-i": {
    id: "next-greater-element-i",
    title: "Next Greater Element I",
    difficulty: "Easy",
    category: "Stack • Monotonic Stack",
    description: {
      text: "For each element in nums1, find its next greater element in nums2.",
      notes: [],
    },
    examples: [
      { input: "nums1=[4,1,2], nums2=[1,3,4,2]", output: "[-1,3,-1]" },
      { input: "nums1=[2,4], nums2=[1,2,3,4]", output: "[3,-1]" },
    ],
    constraints: ["1 <= nums1.length <= nums2.length <= 1000"],
    starterCode: {
      javascript: `function nextGreaterElement(nums1, nums2) {
  // Write your solution here
}

console.log(nextGreaterElement([4,1,2], [1,3,4,2])); // Expected: [-1,3,-1]
console.log(nextGreaterElement([2,4], [1,2,3,4])); // Expected: [3,-1]`,
      python: `def nextGreaterElement(nums1, nums2):
    # Write your solution here
    pass

print(nextGreaterElement([4,1,2], [1,3,4,2]))  # Expected: [-1,3,-1]
print(nextGreaterElement([2,4], [1,2,3,4]))  # Expected: [3,-1]`,
      java: `import java.util.*;

class Solution {
    public static int[] nextGreaterElement(int[] nums1, int[] nums2) {
        // Write your solution here
        return new int[0];
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(nextGreaterElement(new int[]{4,1,2}, new int[]{1,3,4,2}))); // Expected: [-1, 3, -1]
        System.out.println(Arrays.toString(nextGreaterElement(new int[]{2,4}, new int[]{1,2,3,4}))); // Expected: [3, -1]
    }
}`,
    },
    expectedOutput: {
      javascript: "[-1,3,-1]\n[3,-1]",
      python: "[-1, 3, -1]\n[3, -1]",
      java: "[-1, 3, -1]\n[3, -1]",
    },
  },

  "evaluate-reverse-polish-notation": {
    id: "evaluate-reverse-polish-notation",
    title: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    category: "Stack • Math",
    description: {
      text: "Evaluate arithmetic expression in Reverse Polish Notation.",
      notes: ["Division should truncate toward zero."],
    },
    examples: [
      { input: 'tokens=["2","1","+","3","*"]', output: "9" },
      { input: 'tokens=["4","13","5","/","+"]', output: "6" },
    ],
    constraints: ["1 <= tokens.length <= 10^4"],
    starterCode: {
      javascript: `function evalRPN(tokens) {
  // Write your solution here
}

console.log(evalRPN(["2","1","+","3","*"])); // Expected: 9
console.log(evalRPN(["4","13","5","/","+"])); // Expected: 6`,
      python: `def evalRPN(tokens):
    # Write your solution here
    pass

print(evalRPN(["2","1","+","3","*"]))  # Expected: 9
print(evalRPN(["4","13","5","/","+"]))  # Expected: 6`,
      java: `class Solution {
    public static int evalRPN(String[] tokens) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(evalRPN(new String[]{"2","1","+","3","*"})); // Expected: 9
        System.out.println(evalRPN(new String[]{"4","13","5","/","+"})); // Expected: 6
    }
}`,
    },
    expectedOutput: {
      javascript: "9\n6",
      python: "9\n6",
      java: "9\n6",
    },
  },

  "asteroid-collision": {
    id: "asteroid-collision",
    title: "Asteroid Collision",
    difficulty: "Medium",
    category: "Stack • Simulation",
    description: {
      text: "Given asteroids moving in a line, return the state after collisions.",
      notes: [],
    },
    examples: [
      { input: "asteroids=[5,10,-5]", output: "[5,10]" },
      { input: "asteroids=[8,-8]", output: "[]" },
    ],
    constraints: ["2 <= asteroids.length <= 10^4"],
    starterCode: {
      javascript: `function asteroidCollision(asteroids) {
  // Write your solution here
}

console.log(asteroidCollision([5,10,-5])); // Expected: [5,10]
console.log(asteroidCollision([8,-8])); // Expected: []`,
      python: `def asteroidCollision(asteroids):
    # Write your solution here
    pass

print(asteroidCollision([5,10,-5]))  # Expected: [5,10]
print(asteroidCollision([8,-8]))  # Expected: []`,
      java: `import java.util.*;

class Solution {
    public static int[] asteroidCollision(int[] asteroids) {
        // Write your solution here
        return new int[0];
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(asteroidCollision(new int[]{5,10,-5}))); // Expected: [5, 10]
        System.out.println(Arrays.toString(asteroidCollision(new int[]{8,-8}))); // Expected: []
    }
}`,
    },
    expectedOutput: {
      javascript: "[5,10]\n[]",
      python: "[5, 10]\n[]",
      java: "[5, 10]\n[]",
    },
  },

  "remove-k-digits": {
    id: "remove-k-digits",
    title: "Remove K Digits",
    difficulty: "Medium",
    category: "Stack • Greedy",
    description: {
      text: "Remove k digits from number string to make the smallest possible number.",
      notes: [],
    },
    examples: [
      { input: 'num="1432219", k=3', output: '"1219"' },
      { input: 'num="10200", k=1', output: '"200"' },
    ],
    constraints: ["1 <= k <= num.length <= 10^5"],
    starterCode: {
      javascript: `function removeKdigits(num, k) {
  // Write your solution here
}

console.log(removeKdigits("1432219", 3)); // Expected: 1219
console.log(removeKdigits("10200", 1)); // Expected: 200`,
      python: `def removeKdigits(num, k):
    # Write your solution here
    pass

print(removeKdigits("1432219", 3))  # Expected: 1219
print(removeKdigits("10200", 1))  # Expected: 200`,
      java: `class Solution {
    public static String removeKdigits(String num, int k) {
        // Write your solution here
        return "";
    }

    public static void main(String[] args) {
        System.out.println(removeKdigits("1432219", 3)); // Expected: 1219
        System.out.println(removeKdigits("10200", 1)); // Expected: 200
    }
}`,
    },
    expectedOutput: {
      javascript: "1219\n200",
      python: "1219\n200",
      java: "1219\n200",
    },
  },

  "decode-string": {
    id: "decode-string",
    title: "Decode String",
    difficulty: "Medium",
    category: "Stack • String",
    description: {
      text: "Decode an encoded string where k[encoded_string] repeats encoded_string k times.",
      notes: [],
    },
    examples: [
      { input: 's="3[a]2[bc]"', output: '"aaabcbc"' },
      { input: 's="3[a2[c]]"', output: '"accaccacc"' },
    ],
    constraints: ["1 <= s.length <= 30"],
    starterCode: {
      javascript: `function decodeString(s) {
  // Write your solution here
}

console.log(decodeString("3[a]2[bc]")); // Expected: aaabcbc
console.log(decodeString("3[a2[c]]")); // Expected: accaccacc`,
      python: `def decodeString(s):
    # Write your solution here
    pass

print(decodeString("3[a]2[bc]"))  # Expected: aaabcbc
print(decodeString("3[a2[c]]"))  # Expected: accaccacc`,
      java: `class Solution {
    public static String decodeString(String s) {
        // Write your solution here
        return "";
    }

    public static void main(String[] args) {
        System.out.println(decodeString("3[a]2[bc]")); // Expected: aaabcbc
        System.out.println(decodeString("3[a2[c]]")); // Expected: accaccacc
    }
}`,
    },
    expectedOutput: {
      javascript: "aaabcbc\naccaccacc",
      python: "aaabcbc\naccaccacc",
      java: "aaabcbc\naccaccacc",
    },
  },

  "design-circular-queue": {
    id: "design-circular-queue",
    title: "Design Circular Queue",
    difficulty: "Medium",
    category: "Queue • Design",
    description: {
      text: "Implement a circular queue with fixed size.",
      notes: [],
    },
    examples: [
      {
        input: "operation sequence",
        output: "true\ntrue\ntrue\nfalse\n3\ntrue\ntrue\n4",
      },
    ],
    constraints: ["1 <= k <= 1000"],
    starterCode: {
      javascript: `class MyCircularQueue {
  // Write your solution here
}

const q = new MyCircularQueue(3);
console.log(q.enQueue(1));
console.log(q.enQueue(2));
console.log(q.enQueue(3));
console.log(q.enQueue(4));
console.log(q.Rear());
console.log(q.isFull());
console.log(q.deQueue());
console.log(q.enQueue(4));
console.log(q.Rear());`,
      python: `class MyCircularQueue:
    # Write your solution here
    pass

q = MyCircularQueue(3)
print(q.enQueue(1))
print(q.enQueue(2))
print(q.enQueue(3))
print(q.enQueue(4))
print(q.Rear())
print(q.isFull())
print(q.deQueue())
print(q.enQueue(4))
print(q.Rear())`,
      java: `class MyCircularQueue {
    // Write your solution here
}

class Solution {
    public static void main(String[] args) {
        MyCircularQueue q = new MyCircularQueue(3);
        System.out.println(q.enQueue(1));
        System.out.println(q.enQueue(2));
        System.out.println(q.enQueue(3));
        System.out.println(q.enQueue(4));
        System.out.println(q.Rear());
        System.out.println(q.isFull());
        System.out.println(q.deQueue());
        System.out.println(q.enQueue(4));
        System.out.println(q.Rear());
    }
}`,
    },
    expectedOutput: {
      javascript: "true\ntrue\ntrue\nfalse\n3\ntrue\ntrue\ntrue\n4",
      python: "True\nTrue\nTrue\nFalse\n3\nTrue\nTrue\nTrue\n4",
      java: "true\ntrue\ntrue\nfalse\n3\ntrue\ntrue\ntrue\n4",
    },
  },

  "time-needed-to-buy-tickets": {
    id: "time-needed-to-buy-tickets",
    title: "Time Needed to Buy Tickets",
    difficulty: "Easy",
    category: "Queue • Simulation",
    description: {
      text: "Return total time required for person k to finish buying tickets.",
      notes: [],
    },
    examples: [
      { input: "tickets=[2,3,2], k=2", output: "6" },
      { input: "tickets=[5,1,1,1], k=0", output: "8" },
    ],
    constraints: ["1 <= tickets.length <= 100"],
    starterCode: {
      javascript: `function timeRequiredToBuy(tickets, k) {
  // Write your solution here
}

console.log(timeRequiredToBuy([2,3,2], 2)); // Expected: 6
console.log(timeRequiredToBuy([5,1,1,1], 0)); // Expected: 8`,
      python: `def timeRequiredToBuy(tickets, k):
    # Write your solution here
    pass

print(timeRequiredToBuy([2,3,2], 2))  # Expected: 6
print(timeRequiredToBuy([5,1,1,1], 0))  # Expected: 8`,
      java: `class Solution {
    public static int timeRequiredToBuy(int[] tickets, int k) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(timeRequiredToBuy(new int[]{2,3,2}, 2)); // Expected: 6
        System.out.println(timeRequiredToBuy(new int[]{5,1,1,1}, 0)); // Expected: 8
    }
}`,
    },
    expectedOutput: {
      javascript: "6\n8",
      python: "6\n8",
      java: "6\n8",
    },
  },

  "reveal-cards-in-increasing-order": {
    id: "reveal-cards-in-increasing-order",
    title: "Reveal Cards In Increasing Order",
    difficulty: "Medium",
    category: "Queue • Sorting",
    description: {
      text: "Arrange deck so that revealing process gives increasing order.",
      notes: [],
    },
    examples: [
      { input: "deck=[17,13,11,2,3,5,7]", output: "[2,13,3,11,5,17,7]" },
      { input: "deck=[1,1000]", output: "[1,1000]" },
    ],
    constraints: ["1 <= deck.length <= 1000"],
    starterCode: {
      javascript: `function deckRevealedIncreasing(deck) {
  // Write your solution here
}

console.log(deckRevealedIncreasing([17,13,11,2,3,5,7])); // Expected: [2,13,3,11,5,17,7]
console.log(deckRevealedIncreasing([1,1000])); // Expected: [1,1000]`,
      python: `def deckRevealedIncreasing(deck):
    # Write your solution here
    pass

print(deckRevealedIncreasing([17,13,11,2,3,5,7]))  # Expected: [2,13,3,11,5,17,7]
print(deckRevealedIncreasing([1,1000]))  # Expected: [1,1000]`,
      java: `import java.util.*;

class Solution {
    public static int[] deckRevealedIncreasing(int[] deck) {
        // Write your solution here
        return new int[0];
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(deckRevealedIncreasing(new int[]{17,13,11,2,3,5,7}))); // Expected: [2, 13, 3, 11, 5, 17, 7]
        System.out.println(Arrays.toString(deckRevealedIncreasing(new int[]{1,1000}))); // Expected: [1, 1000]
    }
}`,
    },
    expectedOutput: {
      javascript: "[2,13,3,11,5,17,7]\n[1,1000]",
      python: "[2, 13, 3, 11, 5, 17, 7]\n[1, 1000]",
      java: "[2, 13, 3, 11, 5, 17, 7]\n[1, 1000]",
    },
  },

  "dota2-senate": {
    id: "dota2-senate",
    title: "Dota2 Senate",
    difficulty: "Medium",
    category: "Queue • Greedy",
    description: {
      text: "Predict which party will win by banning opponents in rounds.",
      notes: [],
    },
    examples: [
      { input: 'senate="RD"', output: '"Radiant"' },
      { input: 'senate="RDD"', output: '"Dire"' },
    ],
    constraints: ["1 <= senate.length <= 10^4"],
    starterCode: {
      javascript: `function predictPartyVictory(senate) {
  // Write your solution here
}

console.log(predictPartyVictory("RD")); // Expected: Radiant
console.log(predictPartyVictory("RDD")); // Expected: Dire`,
      python: `def predictPartyVictory(senate):
    # Write your solution here
    pass

print(predictPartyVictory("RD"))  # Expected: Radiant
print(predictPartyVictory("RDD"))  # Expected: Dire`,
      java: `class Solution {
    public static String predictPartyVictory(String senate) {
        // Write your solution here
        return "";
    }

    public static void main(String[] args) {
        System.out.println(predictPartyVictory("RD")); // Expected: Radiant
        System.out.println(predictPartyVictory("RDD")); // Expected: Dire
    }
}`,
    },
    expectedOutput: {
      javascript: "Radiant\nDire",
      python: "Radiant\nDire",
      java: "Radiant\nDire",
    },
  },

  "sliding-window-maximum": {
    id: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    category: "Queue • Monotonic Queue",
    description: {
      text: "Return max value in each sliding window of size k.",
      notes: [],
    },
    examples: [
      { input: "nums=[1,3,-1,-3,5,3,6,7], k=3", output: "[3,3,5,5,6,7]" },
      { input: "nums=[1], k=1", output: "[1]" },
    ],
    constraints: ["1 <= nums.length <= 10^5"],
    starterCode: {
      javascript: `function maxSlidingWindow(nums, k) {
  // Write your solution here
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // Expected: [3,3,5,5,6,7]
console.log(maxSlidingWindow([1], 1)); // Expected: [1]`,
      python: `def maxSlidingWindow(nums, k):
    # Write your solution here
    pass

print(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))  # Expected: [3,3,5,5,6,7]
print(maxSlidingWindow([1], 1))  # Expected: [1]`,
      java: `import java.util.*;

class Solution {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        // Write your solution here
        return new int[0];
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(maxSlidingWindow(new int[]{1,3,-1,-3,5,3,6,7}, 3))); // Expected: [3, 3, 5, 5, 6, 7]
        System.out.println(Arrays.toString(maxSlidingWindow(new int[]{1}, 1))); // Expected: [1]
    }
}`,
    },
    expectedOutput: {
      javascript: "[3,3,5,5,6,7]\n[1]",
      python: "[3, 3, 5, 5, 6, 7]\n[1]",
      java: "[3, 3, 5, 5, 6, 7]\n[1]",
    },
  },

  "merge-two-sorted-lists": {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    description: {
      text: "Merge two sorted linked lists and return as one sorted list.",
      notes: [],
    },
    examples: [
      { input: "list1=[1,2,4], list2=[1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1=[], list2=[]", output: "[]" },
    ],
    constraints: ["The number of nodes in both lists is in [0, 50]"],
    starterCode: {
      javascript: `function mergeLists(a, b) {
  // Write your solution here for array simulation
}

console.log(mergeLists([1,2,4], [1,3,4])); // Expected: [1,1,2,3,4,4]
console.log(mergeLists([], [])); // Expected: []`,
      python: `def mergeLists(a, b):
    # Write your solution here for array simulation
    pass

print(mergeLists([1,2,4], [1,3,4]))  # Expected: [1,1,2,3,4,4]
print(mergeLists([], []))  # Expected: []`,
      java: `import java.util.*;

class Solution {
    public static List<Integer> mergeLists(List<Integer> a, List<Integer> b) {
        // Write your solution here for array simulation
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        System.out.println(mergeLists(Arrays.asList(1,2,4), Arrays.asList(1,3,4))); // Expected: [1, 1, 2, 3, 4, 4]
        System.out.println(mergeLists(Arrays.asList(), Arrays.asList())); // Expected: []
    }
}`,
    },
    expectedOutput: {
      javascript: "[1,1,2,3,4,4]\n[]",
      python: "[1, 1, 2, 3, 4, 4]\n[]",
      java: "[1, 1, 2, 3, 4, 4]\n[]",
    },
  },

  "linked-list-cycle": {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    difficulty: "Easy",
    category: "Linked List • Two Pointers",
    description: {
      text: "Determine if a linked list has a cycle.",
      notes: [],
    },
    examples: [
      { input: "head=[3,2,0,-4], pos=1", output: "true" },
      { input: "head=[1], pos=-1", output: "false" },
    ],
    constraints: ["The number of nodes in the list is in [0, 10^4]"],
    starterCode: {
      javascript: `function hasCycle(values, pos) {
  // Write your solution here for array simulation
}

console.log(hasCycle([3,2,0,-4], 1)); // Expected: true
console.log(hasCycle([1], -1)); // Expected: false`,
      python: `def hasCycle(values, pos):
    # Write your solution here for array simulation
    pass

print(hasCycle([3,2,0,-4], 1))  # Expected: True
print(hasCycle([1], -1))  # Expected: False`,
      java: `class Solution {
    public static boolean hasCycle(int[] values, int pos) {
        // Write your solution here for array simulation
        return false;
    }

    public static void main(String[] args) {
        System.out.println(hasCycle(new int[]{3,2,0,-4}, 1)); // Expected: true
        System.out.println(hasCycle(new int[]{1}, -1)); // Expected: false
    }
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
    },
  },

  "remove-nth-node-from-end-of-list": {
    id: "remove-nth-node-from-end-of-list",
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    category: "Linked List • Two Pointers",
    description: {
      text: "Remove the nth node from end and return resulting list.",
      notes: [],
    },
    examples: [
      { input: "head=[1,2,3,4,5], n=2", output: "[1,2,3,5]" },
      { input: "head=[1], n=1", output: "[]" },
    ],
    constraints: ["The number of nodes in the list is sz", "1 <= sz <= 30"],
    starterCode: {
      javascript: `function removeNthFromEnd(values, n) {
  // Write your solution here for array simulation
}

console.log(removeNthFromEnd([1,2,3,4,5], 2)); // Expected: [1,2,3,5]
console.log(removeNthFromEnd([1], 1)); // Expected: []`,
      python: `def removeNthFromEnd(values, n):
    # Write your solution here for array simulation
    pass

print(removeNthFromEnd([1,2,3,4,5], 2))  # Expected: [1,2,3,5]
print(removeNthFromEnd([1], 1))  # Expected: []`,
      java: `import java.util.*;

class Solution {
    public static List<Integer> removeNthFromEnd(List<Integer> values, int n) {
        // Write your solution here for array simulation
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        System.out.println(removeNthFromEnd(Arrays.asList(1,2,3,4,5), 2)); // Expected: [1, 2, 3, 5]
        System.out.println(removeNthFromEnd(Arrays.asList(1), 1)); // Expected: []
    }
}`,
    },
    expectedOutput: {
      javascript: "[1,2,3,5]\n[]",
      python: "[1, 2, 3, 5]\n[]",
      java: "[1, 2, 3, 5]\n[]",
    },
  },

  "reorder-list": {
    id: "reorder-list",
    title: "Reorder List",
    difficulty: "Medium",
    category: "Linked List • Two Pointers",
    description: {
      text: "Reorder list as L0->Ln->L1->Ln-1 pattern.",
      notes: [],
    },
    examples: [
      { input: "head=[1,2,3,4]", output: "[1,4,2,3]" },
      { input: "head=[1,2,3,4,5]", output: "[1,5,2,4,3]" },
    ],
    constraints: ["1 <= number of nodes <= 5 * 10^4"],
    starterCode: {
      javascript: `function reorderList(values) {
  // Write your solution here for array simulation
}

console.log(reorderList([1,2,3,4])); // Expected: [1,4,2,3]
console.log(reorderList([1,2,3,4,5])); // Expected: [1,5,2,4,3]`,
      python: `def reorderList(values):
    # Write your solution here for array simulation
    pass

print(reorderList([1,2,3,4]))  # Expected: [1,4,2,3]
print(reorderList([1,2,3,4,5]))  # Expected: [1,5,2,4,3]`,
      java: `import java.util.*;

class Solution {
    public static List<Integer> reorderList(List<Integer> values) {
        // Write your solution here for array simulation
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        System.out.println(reorderList(Arrays.asList(1,2,3,4))); // Expected: [1, 4, 2, 3]
        System.out.println(reorderList(Arrays.asList(1,2,3,4,5))); // Expected: [1, 5, 2, 4, 3]
    }
}`,
    },
    expectedOutput: {
      javascript: "[1,4,2,3]\n[1,5,2,4,3]",
      python: "[1, 4, 2, 3]\n[1, 5, 2, 4, 3]",
      java: "[1, 4, 2, 3]\n[1, 5, 2, 4, 3]",
    },
  },

  "add-two-numbers": {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List • Math",
    description: {
      text: "Add two numbers represented by reverse-order linked lists.",
      notes: [],
    },
    examples: [
      { input: "l1=[2,4,3], l2=[5,6,4]", output: "[7,0,8]" },
      { input: "l1=[0], l2=[0]", output: "[0]" },
    ],
    constraints: ["The number of nodes in each list is in [1, 100]"],
    starterCode: {
      javascript: `function addTwoNumbers(a, b) {
  // Write your solution here for array simulation
}

console.log(addTwoNumbers([2,4,3], [5,6,4])); // Expected: [7,0,8]
console.log(addTwoNumbers([0], [0])); // Expected: [0]`,
      python: `def addTwoNumbers(a, b):
    # Write your solution here for array simulation
    pass

print(addTwoNumbers([2,4,3], [5,6,4]))  # Expected: [7,0,8]
print(addTwoNumbers([0], [0]))  # Expected: [0]`,
      java: `import java.util.*;

class Solution {
    public static List<Integer> addTwoNumbers(List<Integer> a, List<Integer> b) {
        // Write your solution here for array simulation
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        System.out.println(addTwoNumbers(Arrays.asList(2,4,3), Arrays.asList(5,6,4))); // Expected: [7, 0, 8]
        System.out.println(addTwoNumbers(Arrays.asList(0), Arrays.asList(0))); // Expected: [0]
    }
}`,
    },
    expectedOutput: {
      javascript: "[7,0,8]\n[0]",
      python: "[7, 0, 8]\n[0]",
      java: "[7, 0, 8]\n[0]",
    },
  },

  "same-tree": {
    id: "same-tree",
    title: "Same Tree",
    difficulty: "Easy",
    category: "Tree • DFS",
    description: {
      text: "Check whether two binary trees are structurally identical and same values.",
      notes: [],
    },
    examples: [
      { input: "p=[1,2,3], q=[1,2,3]", output: "true" },
      { input: "p=[1,2], q=[1,null,2]", output: "false" },
    ],
    constraints: ["Number of nodes in both trees is in [0, 100]"],
    starterCode: {
      javascript: `function isSameTreeArray(p, q) {
  // Write your solution here for array-based tree simulation
}

console.log(isSameTreeArray([1,2,3], [1,2,3])); // Expected: true
console.log(isSameTreeArray([1,2], [1,null,2])); // Expected: false`,
      python: `def isSameTreeArray(p, q):
    # Write your solution here for array-based tree simulation
    pass

print(isSameTreeArray([1,2,3], [1,2,3]))  # Expected: True
print(isSameTreeArray([1,2], [1,None,2]))  # Expected: False`,
      java: `class Solution {
    public static boolean isSameTreeArray(Integer[] p, Integer[] q) {
        // Write your solution here for array-based tree simulation
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isSameTreeArray(new Integer[]{1,2,3}, new Integer[]{1,2,3})); // Expected: true
        System.out.println(isSameTreeArray(new Integer[]{1,2}, new Integer[]{1,null,2})); // Expected: false
    }
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
    },
  },

  "invert-binary-tree": {
    id: "invert-binary-tree",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    category: "Tree • DFS",
    description: {
      text: "Invert a binary tree and return the root.",
      notes: [],
    },
    examples: [
      { input: "root=[4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root=[2,1,3]", output: "[2,3,1]" },
    ],
    constraints: ["The number of nodes in the tree is in [0, 100]"],
    starterCode: {
      javascript: `function invertTreeArray(levelOrder) {
  // Write your solution here for array-based tree simulation
}

console.log(invertTreeArray([4,2,7,1,3,6,9])); // Expected: [4,7,2,9,6,3,1]
console.log(invertTreeArray([2,1,3])); // Expected: [2,3,1]`,
      python: `def invertTreeArray(levelOrder):
    # Write your solution here for array-based tree simulation
    pass

print(invertTreeArray([4,2,7,1,3,6,9]))  # Expected: [4,7,2,9,6,3,1]
print(invertTreeArray([2,1,3]))  # Expected: [2,3,1]`,
      java: `import java.util.*;

class Solution {
    public static List<Integer> invertTreeArray(Integer[] levelOrder) {
        // Write your solution here for array-based tree simulation
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        System.out.println(invertTreeArray(new Integer[]{4,2,7,1,3,6,9})); // Expected: [4, 7, 2, 9, 6, 3, 1]
        System.out.println(invertTreeArray(new Integer[]{2,1,3})); // Expected: [2, 3, 1]
    }
}`,
    },
    expectedOutput: {
      javascript: "[4,7,2,9,6,3,1]\n[2,3,1]",
      python: "[4, 7, 2, 9, 6, 3, 1]\n[2, 3, 1]",
      java: "[4, 7, 2, 9, 6, 3, 1]\n[2, 3, 1]",
    },
  },

  "binary-tree-level-order-traversal": {
    id: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Tree • BFS",
    description: {
      text: "Return level order traversal (BFS) of node values.",
      notes: [],
    },
    examples: [
      { input: "root=[3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      { input: "root=[1]", output: "[[1]]" },
    ],
    constraints: ["The number of nodes in the tree is in [0, 2000]"],
    starterCode: {
      javascript: `function levelOrderArray(levelOrder) {
  // Write your solution here for array-based tree simulation
}

console.log(JSON.stringify(levelOrderArray([3,9,20,null,null,15,7]))); // Expected: [[3],[9,20],[15,7]]
console.log(JSON.stringify(levelOrderArray([1]))); // Expected: [[1]]`,
      python: `def levelOrderArray(levelOrder):
    # Write your solution here for array-based tree simulation
    pass

print(levelOrderArray([3,9,20,None,None,15,7]))  # Expected: [[3],[9,20],[15,7]]
print(levelOrderArray([1]))  # Expected: [[1]]`,
      java: `import java.util.*;

class Solution {
    public static List<List<Integer>> levelOrderArray(Integer[] levelOrder) {
        // Write your solution here for array-based tree simulation
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        System.out.println(levelOrderArray(new Integer[]{3,9,20,null,null,15,7})); // Expected: [[3], [9, 20], [15, 7]]
        System.out.println(levelOrderArray(new Integer[]{1})); // Expected: [[1]]
    }
}`,
    },
    expectedOutput: {
      javascript: "[[3],[9,20],[15,7]]\n[[1]]",
      python: "[[3], [9, 20], [15, 7]]\n[[1]]",
      java: "[[3], [9, 20], [15, 7]]\n[[1]]",
    },
  },

  "number-of-islands": {
    id: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Graph • DFS • BFS",
    description: {
      text: "Count connected components of land in a 2D grid.",
      notes: [],
    },
    examples: [
      {
        input: "grid=[[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]",
        output: "1",
      },
      {
        input: "grid=[[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]]",
        output: "3",
      },
    ],
    constraints: ["m == grid.length", "n == grid[i].length"],
    starterCode: {
      javascript: `function numIslands(grid) {
  // Write your solution here
}

console.log(numIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]])); // Expected: 1
console.log(numIslands([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]])); // Expected: 3`,
      python: `def numIslands(grid):
    # Write your solution here
    pass

print(numIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]))  # Expected: 1
print(numIslands([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]))  # Expected: 3`,
      java: `class Solution {
    public static int numIslands(char[][] grid) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        char[][] g1 = {{'1','1','1','1','0'},{'1','1','0','1','0'},{'1','1','0','0','0'},{'0','0','0','0','0'}};
        char[][] g2 = {{'1','1','0','0','0'},{'1','1','0','0','0'},{'0','0','1','0','0'},{'0','0','0','1','1'}};
        System.out.println(numIslands(g1)); // Expected: 1
        System.out.println(numIslands(g2)); // Expected: 3
    }
}`,
    },
    expectedOutput: {
      javascript: "1\n3",
      python: "1\n3",
      java: "1\n3",
    },
  },

  "clone-graph": {
    id: "clone-graph",
    title: "Clone Graph",
    difficulty: "Medium",
    category: "Graph • DFS • BFS",
    description: {
      text: "Deep copy an undirected connected graph.",
      notes: [],
    },
    examples: [
      {
        input: "adjList=[[2,4],[1,3],[2,4],[1,3]]",
        output: "[[2,4],[1,3],[2,4],[1,3]]",
      },
      { input: "adjList=[]", output: "[]" },
    ],
    constraints: ["Number of nodes in graph is in [0, 100]"],
    starterCode: {
      javascript: `function cloneGraphAdjList(adjList) {
  // Write your solution here for adjacency-list simulation
}

console.log(JSON.stringify(cloneGraphAdjList([[2,4],[1,3],[2,4],[1,3]]))); // Expected: [[2,4],[1,3],[2,4],[1,3]]
console.log(JSON.stringify(cloneGraphAdjList([]))); // Expected: []`,
      python: `def cloneGraphAdjList(adjList):
    # Write your solution here for adjacency-list simulation
    pass

print(cloneGraphAdjList([[2,4],[1,3],[2,4],[1,3]]))  # Expected: [[2,4],[1,3],[2,4],[1,3]]
print(cloneGraphAdjList([]))  # Expected: []`,
      java: `import java.util.*;

class Solution {
    public static List<List<Integer>> cloneGraphAdjList(List<List<Integer>> adjList) {
        // Write your solution here for adjacency-list simulation
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        List<List<Integer>> graph = new ArrayList<>();
        graph.add(Arrays.asList(2,4));
        graph.add(Arrays.asList(1,3));
        graph.add(Arrays.asList(2,4));
        graph.add(Arrays.asList(1,3));
        System.out.println(cloneGraphAdjList(graph)); // Expected: [[2, 4], [1, 3], [2, 4], [1, 3]]
        System.out.println(cloneGraphAdjList(new ArrayList<>())); // Expected: []
    }
}`,
    },
    expectedOutput: {
      javascript: "[[2,4],[1,3],[2,4],[1,3]]\n[]",
      python: "[[2, 4], [1, 3], [2, 4], [1, 3]]\n[]",
      java: "[[2, 4], [1, 3], [2, 4], [1, 3]]\n[]",
    },
  },

  "climbing-stairs": {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    description: {
      text: "Count distinct ways to climb n steps when you can take 1 or 2 steps.",
      notes: [],
    },
    examples: [
      { input: "n=2", output: "2" },
      { input: "n=3", output: "3" },
    ],
    constraints: ["1 <= n <= 45"],
    starterCode: {
      javascript: `function climbStairs(n) {
  // Write your solution here
}

console.log(climbStairs(2)); // Expected: 2
console.log(climbStairs(3)); // Expected: 3`,
      python: `def climbStairs(n):
    # Write your solution here
    pass

print(climbStairs(2))  # Expected: 2
print(climbStairs(3))  # Expected: 3`,
      java: `class Solution {
    public static int climbStairs(int n) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(climbStairs(2)); // Expected: 2
        System.out.println(climbStairs(3)); // Expected: 3
    }
}`,
    },
    expectedOutput: {
      javascript: "2\n3",
      python: "2\n3",
      java: "2\n3",
    },
  },

  "house-robber": {
    id: "house-robber",
    title: "House Robber",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: {
      text: "Maximize amount robbed without robbing adjacent houses.",
      notes: [],
    },
    examples: [
      { input: "nums=[1,2,3,1]", output: "4" },
      { input: "nums=[2,7,9,3,1]", output: "12" },
    ],
    constraints: ["1 <= nums.length <= 100"],
    starterCode: {
      javascript: `function rob(nums) {
  // Write your solution here
}

console.log(rob([1,2,3,1])); // Expected: 4
console.log(rob([2,7,9,3,1])); // Expected: 12`,
      python: `def rob(nums):
    # Write your solution here
    pass

print(rob([1,2,3,1]))  # Expected: 4
print(rob([2,7,9,3,1]))  # Expected: 12`,
      java: `class Solution {
    public static int rob(int[] nums) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(rob(new int[]{1,2,3,1})); // Expected: 4
        System.out.println(rob(new int[]{2,7,9,3,1})); // Expected: 12
    }
}`,
    },
    expectedOutput: {
      javascript: "4\n12",
      python: "4\n12",
      java: "4\n12",
    },
  },

  "coin-change": {
    id: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: {
      text: "Find the fewest number of coins needed to make up a given amount.",
      notes: ["Return -1 if amount cannot be formed."],
    },
    examples: [
      { input: "coins=[1,2,5], amount=11", output: "3" },
      { input: "coins=[2], amount=3", output: "-1" },
    ],
    constraints: ["1 <= coins.length <= 12"],
    starterCode: {
      javascript: `function coinChange(coins, amount) {
  // Write your solution here
}

console.log(coinChange([1,2,5], 11)); // Expected: 3
console.log(coinChange([2], 3)); // Expected: -1`,
      python: `def coinChange(coins, amount):
    # Write your solution here
    pass

print(coinChange([1,2,5], 11))  # Expected: 3
print(coinChange([2], 3))  # Expected: -1`,
      java: `class Solution {
    public static int coinChange(int[] coins, int amount) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(coinChange(new int[]{1,2,5}, 11)); // Expected: 3
        System.out.println(coinChange(new int[]{2}, 3)); // Expected: -1
    }
}`,
    },
    expectedOutput: {
      javascript: "3\n-1",
      python: "3\n-1",
      java: "3\n-1",
    },
  },

  "longest-increasing-subsequence": {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: {
      text: "Return the length of the longest strictly increasing subsequence.",
      notes: [],
    },
    examples: [
      { input: "nums=[10,9,2,5,3,7,101,18]", output: "4" },
      { input: "nums=[0,1,0,3,2,3]", output: "4" },
    ],
    constraints: ["1 <= nums.length <= 2500"],
    starterCode: {
      javascript: `function lengthOfLIS(nums) {
  // Write your solution here
}

console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // Expected: 4
console.log(lengthOfLIS([0,1,0,3,2,3])); // Expected: 4`,
      python: `def lengthOfLIS(nums):
    # Write your solution here
    pass

print(lengthOfLIS([10,9,2,5,3,7,101,18]))  # Expected: 4
print(lengthOfLIS([0,1,0,3,2,3]))  # Expected: 4`,
      java: `class Solution {
    public static int lengthOfLIS(int[] nums) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLIS(new int[]{10,9,2,5,3,7,101,18})); // Expected: 4
        System.out.println(lengthOfLIS(new int[]{0,1,0,3,2,3})); // Expected: 4
    }
}`,
    },
    expectedOutput: {
      javascript: "4\n4",
      python: "4\n4",
      java: "4\n4",
    },
  },

  "unique-paths": {
    id: "unique-paths",
    title: "Unique Paths",
    difficulty: "Medium",
    category: "Dynamic Programming • Grid",
    description: {
      text: "Count unique paths from top-left to bottom-right in an m x n grid.",
      notes: ["Move only right or down."],
    },
    examples: [
      { input: "m=3, n=7", output: "28" },
      { input: "m=3, n=2", output: "3" },
    ],
    constraints: ["1 <= m, n <= 100"],
    starterCode: {
      javascript: `function uniquePaths(m, n) {
  // Write your solution here
}

console.log(uniquePaths(3, 7)); // Expected: 28
console.log(uniquePaths(3, 2)); // Expected: 3`,
      python: `def uniquePaths(m, n):
    # Write your solution here
    pass

print(uniquePaths(3, 7))  # Expected: 28
print(uniquePaths(3, 2))  # Expected: 3`,
      java: `class Solution {
    public static int uniquePaths(int m, int n) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(uniquePaths(3, 7)); // Expected: 28
        System.out.println(uniquePaths(3, 2)); // Expected: 3
    }
}`,
    },
    expectedOutput: {
      javascript: "28\n3",
      python: "28\n3",
      java: "28\n3",
    },
  },
};
