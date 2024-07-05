import React from 'react';
import PropTypes from 'prop-types';
import { Select as BaseSelect, selectClasses } from '@mui/base/Select';
import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import { styled } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';

export default function SimpleSelect({ selectedRole, handleChange }) {
  return (
    <Select value={selectedRole} onChange={handleChange} placeholder="Role">
      <Option value="DOCTOR">DOCTOR</Option>
      <Option value="PATIENT">PATIENT</Option>
      <Option value="LABASSISTANT">LAB ASSISTANT</Option>
      <Option value="LABOPERATOR">LAB OPERATOR</Option>
      <Option value="ADMIN">ADMIN</Option>
    </Select>
  );
}

SimpleSelect.propTypes = {
  selectedRole: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const Select = React.forwardRef(function CustomSelect(props, ref) {
  return <BaseSelect {...props} ref={ref} slots={{ root: StyledButton, listbox: Listbox }} />;
});

Select.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
};

const blue = {
  100: '#DAECFF',
  500: '#007FFF',
};

const grey = {
  50: '#F3F6F9',
  200: '#DAE2ED',
  900: '#1C2025',
};

const Button = React.forwardRef(function Button(props, ref) {
  return (
    <button type="button" {...props} ref={ref}>
      {props.children}
      <UnfoldMoreRoundedIcon />
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.node,
};

const StyledButton = styled(Button)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.7rem;
  min-width: 135px;
  padding: 12px 20px 12px 4px;
  border-radius: 15px;
  background: none;
  border: 1px solid ${grey[200]};
  color: ${grey[900]};
  position: relative;
  margin-right: 10px;
  margin-bottom: 20px;
  height: 40px;

  &:hover {
    background: ${grey[50]};
  }

  &.${selectClasses.focusVisible} {
    border-color: ${blue[500]};
  }

  & > svg {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
`,
);

const Listbox = styled('ul')`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.7rem;
  padding: 6px;
  margin: 8px 0;
  min-width: 122px;
  max-height: 40px; 
  overflow-y: auto;
  border-radius: 8px;
  background: none;
  border: 1px solid ${grey[200]};
  color: ${grey[900]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

const Option = styled(BaseOption)(
  () => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  
  &.${optionClasses.selected} {
    background-color: none;
    color: #101754;
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${grey[50]};
  }
`,
);
