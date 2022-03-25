import React from 'react';
export function ToggleButton({
  validator,
  event,
  ifValidatorIsTrue,
  ifValidatorIsFalse,
}) {
  return (
    <button
      onClick={event}
      style={{
        backgroundColor: 'transparent',
        outline: 'none',
        border: 'none',
      }}
    >
      {validator ? <>{ifValidatorIsTrue}</> : <>{ifValidatorIsFalse}</>}
    </button>
  );
}
