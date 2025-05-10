
<img src="https://github.com/user-attachments/assets/1fa28cd2-230f-47f2-92bb-8b8b4c70ba4f" width="128px">

# PlainBudget

Minimalist plain text budgeting.

[**Read the blog post.**](https://hire.jonasgalvez.com.br/2025/may/8/plainbudget)

[**Get the app.**](https://plainbudget.com/)

```
% npm i pbudget -g
% pbudget -s Budget.txt
% pbudget --stats Budget.txt
% cat Budget.txt | pbudget > Budget.txt
```

## Supported Syntax

- **Groups** start with `=` and are used to group values.

- **Flows** start with `+` and are used to express cash flow.

- **Groups** can be referenced in other groups or flows.

- **Multipliers** can added to any referenced group or value.

- Blocks of text with invalid syntax will be ignored and remain intact in the source.

- Circular dependencies (group references) will cause both groups to be ignored.

- Padding is automatically added to the value column.

<table>
<tr>
<td valign=top>

**Input**

```
= Housing
- 2000 Rent
- 1000 Utilities
- 500 Leisure

= Groceries
- 10 Coffee x 12
- 10 Milk x 12
- 20 Cereal x 6

= Income
- 5000 Salary
- 1000 Side hustle

+ Income
- Main
- Groceries
```

</td>
<td valign=top>

**Output**

```
  = 3500 Main
  - 2000 Rent
  - 1000 Utilities
  -  500 Leisure
  
  =  360 Groceries
  -   10 Coffee x 12
  -   10 Milk x 12
  -   20 Cereal x 6
  
  = 6000 Income
  - 5000 Salary
  - 1000 Side hustle
  
  + 6000 Income
  - 3500 Main
  -  360 Groceries
  = 2140 
```

</td>
</tr>
</table>

## Programmatic Usage

```js
import { readFileSync } from 'node:fs'
import { PlainBudget } from 'plainbudget'

const budget = readFileSync('Budget.txt', 'utf8')

const pbudget = new PlainBudget(budget)

pbudget.process()

console.log(pbudget.renderWithPadding())

pbudget.computeStats()

console.log(pbudget.stats)
```
