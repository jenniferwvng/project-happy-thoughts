import React from 'react'
import { formatDistanceToNow } from 'date-fns'

const MessageDisplay = ({ apiData, getApiData }) => {

  const incrementLikes = async (_id) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
    const response = await fetch(`https://happy-thoughts-technigo.herokuapp.com/thoughts/${_id}/like`, options);
    const json = await response.json();
      if (!response.ok) {
        throw new Error (
          `HTTP error: The status is ${response.status}`
        );
      }
      return json;
    } catch(err) {
      console.log(`error message: ${err.message}`);
    }
  }

  const handleClick = async (_id) => {
    await incrementLikes(_id);
    getApiData();
  }

  const likesStyles = {
    bgColor: 'lightgrey'
  }

  return (
    <>
      {apiData && apiData.map((messageIndex) => {
        const { _id, message, hearts, createdAt } = messageIndex;

        const likesExist = hearts;
        if (likesExist !== 0) {
          likesStyles.bgColor = 'pink';
        } else {
          likesStyles.bgColor = 'lightgrey';
        }

        return (
          <div key={_id} className="message-display-div">
            <p>Message: {message}</p>
            <span>
              <p onClick={(e) => handleClick(_id, e)} style={{ display: 'flex' }}>
                <span style={{ backgroundColor: `${likesStyles.bgColor}`, padding: '10px', borderRadius: '50%' }}>
                  <span role="img" aria-label="Red Heart">❤️</span>
                </span>
                <span style={{ padding: '10px', color: 'grey' }}>x {hearts}</span>
              </p>
              <p style={{ padding: '10px', color: 'grey' }}>
                  Sent {formatDistanceToNow(new Date(createdAt))} ago
              </p>
            </span>
          </div>
        );
      })}

    </>
  )
}

export default MessageDisplay