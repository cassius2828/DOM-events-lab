# Calculator Lab Solutions

I have prepared two solutions for this lab. The basic solution is one I came up with before we came back from lunch on the day the lab was assigned. This was the approach I took to get a basic answer before having the opportunity to hear about the initial approach by instructor Jim.

The advanced solution begins with the structure of Jim's setup, then branches off to my own process of solving the complex bonus solutions such as keydown events, chaining complex calculations (PEMDAS enforced), preventing leading zeros, and more.

## Advanced Solution

### Chaining Calculations with PEMDAS

My favorite part of my solution is how I decided to complete the process of chaining together calculations while adhering to PEMDAS. For this solution, my idea was to store all of the entries in an array and from there, I would first check if the array contains any multiplication or division operators and what the length of the array was. If the array was only 3 indexes long, then I would perform a more simplified calculation, using the fixed indexes of 1 for the operator, 0 for the first number, and 2 for the last number.

If the array length was longer than 3 and contained multiplication or division operators, then I would start a while loop that contained a for loop.

I initialize a scope variable called `tempSum` which will hold the value for the pending calculation. Then the for loop would find the index of the multiplication or division operator. Upon finding it, it would splice the array starting from the index before the operator, delete 3 indexes, and then replace those 3 indexes with the `tempSum`. This calculation was able to be done by including the sum. For example, if we had the following chain:

```
7+3-10*4+23-10/2
```

This will first select `10*4`, do the calculation separately, then return `40` to the array:

```
7+3-40+23-10/2
```

Code snippet:
```javascript
array.splice(i - 1, 3, tempSum);
```

This iteration goes until there are no more multiplication or division operators in the array. Then it goes to the next area of focus, which is all of the addition or subtraction operators. This logic uses the hard-coded values that target the first 3 indexes of the array and splice them away while replacing them with the `tempSum` of that small equation.

One small pitfall is that under some circumstances, the array would contain the final sum as a single index and other times it would contain the last equation to calculate. To solve this, I added a condition that checks the length of the array and will either target the 0 index or calculate the sum of index 0 and index 2. The `answer` variable is set to these final calculations, and that is how I was able to get PEMDAS to work in my solution.

## Conclusion

There are various other parts of the code that are explained in my comments. All in all, I had a great time challenging myself in this exercise.