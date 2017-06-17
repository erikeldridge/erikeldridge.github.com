# Problem

As an engineer, you need to estimate the cost of a task you have little experience performing

# Solution

1. Approach the problem from an eng perspective by describing the system, eg draw a system diagram
1. Draw a chart with the systems involved along the top and the product features down the side, eg

               |Android|iOS|Server|DB|Auth service|...|
    -----------|-------|---|------|--|------------|---|
    Login      |       |   |      |  |            |   |
    -----------|-------|---|------|--|------------|---|
    Create post|       |   |      |  |            |   |
    -----------|-------|---|------|--|------------|---|
    View post  |       |   |      |  |            |   |
    -----------|-------|---|------|--|------------|---|
    ...        |       |   |      |  |            |   |
    -----------|-------|---|------|--|------------|---|
    
1. Add an x for each system required for a feature
1. Replace each x with a rough cost, s/m/l
1. Add a new colum for totals and sum the rough costs from left to right and then top to bottom to arrive at an overall cost estimation, eg

               |Android|iOS|Server|DB|Auth service|...|Totals|
    -----------|-------|---|------|--|------------|---|----- |
    Login      |   M   | M |  S   |  |     S      |   |  6   |
    Create post|   L   | L |  M   |M |            |   |  12  | 
    View post  |   M   | M |  S   |S |            |   |  6   |
    ...        |       |   |      |  |            |   |      |
    Total      |       |   |      |  |            |   |  24  |

# Notes

1. As an eng, estimating cost based on a product description can be difficult; starting with an eng approach list a system diagram helps partition the problem
1. Mapping features to systems also helps with prioritization, ie work on the system blocking the most features first
1. For the rough cost step, disambiguating as a team can be helpful, eg small, medium and large tasks represent 1, 2 and 4 weeks of effort by a single eng
1. I've heard the argument that human have a hard time estimating cost larger than 1-2 weeks (hence the 1-2 week sprint). With this in mind, if our costs are measured in weeks then there's no way our overall estimate can be accurate, which makes me think the value of this exercise is the structure, which can be iterated on and discussed objectively, rather than the actual result

