I used `users` varialbe to store user list and `usersInfo` object to store the start and end time, and treatments counts.

There are 3 main cases in the description.
The first one is the statement for user. `Patient John`.
The second one is the start and end action. `Action Intake John 2023-01-06T09:45:00Z` and `Action Discharge John 2023-01-15T15:58:00Z`
The last is treatment state. `Action Treatment John 2023-01-09T11:35:00Z F5GZ`.
So if I split these statements using space(" ") then the lengths are different. So I identify the statements using the spaces(" ") count.

In any case, if there are no user in the `users` then I added user into the `users`. And also append data to `usersInfo`
Let's assume the user name is `John`, then the `usersInfo` looks like:

`usersInfo = { John: { start: null, end: null, treatments: 0 } }`

If we meed `John` in the loop then define the action if it's start, end or treatment and update the values. In this case I implemented this feature.
