import React from 'react';

const UniqueFriend = (props) => {
  return (
    <li>
      {props.email}
      <button>Recommend</button>
    </li>
  )
}

export default UniqueFriend;
