# React Project spotifyjammming

## Project Structure

![components diagram](./public/notes/projectStructure.png)

## Skills 

- React Class Component

- Components Interaction 

- Lifecycle

- Async requests with a 3rd party API(Spotify)

- [Responsive] layout using Flexbox


## Takeaways & Little Tricks

1. The useful combination of **flex-direction** & **align-items**

    Default Flexbox aligns flex items in the horizontal direction, and in this situation, the cross axis will be the vertical direction.

    Sometimes, we want to have flex items in verticall direction and centered.


    > Switch the main axis from the row direction
    ```
    flex-direction: column;
    ```
    However, only changing the **flex-direction** is not enough. We also encounter some problems about the flex items size.

    > flex-direction:row, let's see the difference between **align-items:normal** vs **align-items: center**

    ![align-items: normal](./public/notes/align-items-01.png)

    Even those 6 flex items have different heights, Flexbox system by default applies the max width of those boxes for all items.

    ![align-items: center](./public/notes/align-items-02.png)

    While when we apply align-items:center, those boxes can have different heights, and in the cross axis direction, centered.


    > So same for **flex-direction:column**

    ![align-items: normal for column direction](./public/notes/align-items-03.png)

    In this situation, flex items take up all space in the cross direction

    ![align-items:center for column direction](./public/notes/align-items-04.png)


   2. CSS transition

        A CSS transition effect can change property values smoothly.

        ```
        //Inside a selector

        div {
            ...
            transition: background-color 0.5s;
        }

        div:hover{
            background-color: a different color;
        }
        ```

        Specify a property you want to change and a duration.

        [More transition knowledge](https://www.w3schools.com/css/css3_transitions.asp)

    3. overflow-y

        > overflow-y: scroll;

        The overflow-y property sets what shows when content overflows a block-level element's top and bottom edges.

        > ::-webkit-scrollbar to create a custom scrollbar

        ```
        ::-webkit-scrollbar{
            width: 10px;
        }

        ::-webkit-scrollbar{
            width: 0px;
            background: transparent;
        }
        ```

    4. Controlled input element

        Use state & onChange

        ```
        ...
        this.setState({value: e.target.value});

        ...
        ```

        Using this combination can have the value of the input and manage it as a state of the component.

    5. .json() & JSON.parse()

        - .json() is asynchronous and returns a Promise object that resolves to a JavaScript object

            ```
            fetch(url, {params})
            .then( response => {
                return response.json();
            })
            .then( jsonResponse => {
                //jsonResponse is a JavaScript object that contains requested info
                ...

            });
            ```

        - JSON.parse() is synchronous that can parse a string and change the resulting returned JavaScript object

    6. An image should be import to the component first and then be used as a variable in the component

        ```
        import guestImage from './guestImage.jpg'; 

        <img src={guestImage} />
        ```

    7. Promise.all

        Promise.all() accepts an array of promises as its argument and retrns a single promise.

        > If every promise in the argumentt array resolves, the single promise returned from Promise.all() will resolve with **an array containing the resolve value from each promise** in the argument array

        > If any promise from the argument array rejects, the single promise returned from Promise.all() will **immediately reject with the reason** that promise rejected.

    8. Git branch tricks

        ```
        git pull
        ```
        Pull the changes from upstream. Your master needs to be up to date

        ```
        git checkout -b [branch name]
        ```
        Create the branch on your local machine and switch in this branch
        ```
        git push origin [branch name]
        ```
        Push the branch on GitHub

        [More git branch info](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches)
        
## Additional Features

1. User Profile

    Can show a user's username and profile image.

2. Display user's playlists

    Click user profile area -> Show a dropdown list with some options, like my playlists, logout
    -> Click My Playlists -> Show user's playlists

## Issues

1. UserProfile Component and User Feature Dropdown list

    Description: Now, the hidden dropdown list is shown when a user hovers over the UserProfile component, and this dropdown list remains visible until a MouseLeave event on it is triggered.

    Problem: If a user hovers on the UserProfile component only, then just exits this part, the MouseLeave event on the dropdown list will not be triggered and the dropdown list will stay visible.

    Solution:
    
    > Add a MouseEnter and a MouseLeave event to the UserProfile Component.
        When a user hovers over the UserProfile Component, set the dropdown list visible

        >  When a user exits the current UserProfile Component, there are two conditions: 1. the user moves down to the Dropdown Component 2. the user browsers other places

        When a user exits, set a timer to make the Dropdown Component disappear after 0.5s

        If the user moves down to the Dropdown Component (this component detects a MouseEnter event), cancel the timer to keep the Dropdown Component on the screen