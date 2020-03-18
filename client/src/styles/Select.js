import React from "react";
import styled from "styled-components";
import theme from "./theme";

const { formBorderColor, letterSpacing } = theme;

const Select = styled.select`
  display: block;
  font-size: 16px;
  letter-spacing: ${letterSpacing};
  color: #444;
  padding: 1rem 1.5rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0;
  border: 1px solid ${formBorderColor};
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #fff 0%, #fff 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 3em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
`;

const SelectDropdown = props => {
  return (
    <Select {...props}>
      <option label="" value=""></option>

      <option label="Alabama" value="AL">
        Alabama
      </option>

      <option label="Alaska" value="AK">
        Alaska
      </option>

      <option label="Arizona" value="AZ">
        Arizona
      </option>

      <option label="Arkansas" value="AR">
        Arkansas
      </option>

      <option label="California" value="CA">
        California
      </option>

      <option label="Colorado" value="CO">
        Colorado
      </option>

      <option label="Connecticut" value="CT">
        Connecticut
      </option>

      <option label="Delaware" value="DE">
        Delaware
      </option>

      <option label="District of Columbia" value="DC">
        District of Columbia
      </option>

      <option label="Florida" value="FL">
        Florida
      </option>

      <option label="Georgia" value="GA">
        Georgia
      </option>

      <option label="Hawaii" value="HI">
        Hawaii
      </option>

      <option label="Idaho" value="ID">
        Idaho
      </option>

      <option label="Illinois" value="IL">
        Illinois
      </option>

      <option label="Indiana" value="IN">
        Indiana
      </option>

      <option label="Iowa" value="IA">
        Iowa
      </option>

      <option label="Kansas" value="KS">
        Kansas
      </option>

      <option label="Kentucky" value="KY">
        Kentucky
      </option>

      <option label="Louisiana" value="LA">
        Louisiana
      </option>

      <option label="Maine" value="ME">
        Maine
      </option>

      <option label="Maryland" value="MD">
        Maryland
      </option>

      <option label="Massachusetts" value="MA">
        Massachusetts
      </option>

      <option label="Michigan" value="MI">
        Michigan
      </option>

      <option label="Minnesota" value="MN">
        Minnesota
      </option>

      <option label="Mississippi" value="MS">
        Mississippi
      </option>

      <option label="Missouri" value="MO">
        Missouri
      </option>

      <option label="Montana" value="MT">
        Montana
      </option>

      <option label="Nebraska" value="NE">
        Nebraska
      </option>

      <option label="Nevada" value="NV">
        Nevada
      </option>

      <option label="New Hampshire" value="NH">
        New Hampshire
      </option>

      <option label="New Jersey" value="NJ">
        New Jersey
      </option>

      <option label="New Mexico" value="NM">
        New Mexico
      </option>

      <option label="New York" value="NY">
        New York
      </option>

      <option label="North Carolina" value="NC">
        North Carolina
      </option>

      <option label="North Dakota" value="ND">
        North Dakota
      </option>

      <option label="Ohio" value="OH">
        Ohio
      </option>

      <option label="Oklahoma" value="OK">
        Oklahoma
      </option>

      <option label="Oregon" value="OR">
        Oregon
      </option>

      <option label="Pennsylvania" value="PA">
        Pennsylvania
      </option>

      <option label="Rhode Island" value="RI">
        Rhode Island
      </option>

      <option label="South Carolina" value="SC">
        South Carolina
      </option>

      <option label="South Dakota" value="SD">
        South Dakota
      </option>

      <option label="Tennessee" value="TN">
        Tennessee
      </option>

      <option label="Texas" value="TX">
        Texas
      </option>

      <option label="Utah" value="UT">
        Utah
      </option>

      <option label="Vermont" value="VT">
        Vermont
      </option>

      <option label="Virginia" value="VA">
        Virginia
      </option>

      <option label="Washington" value="WA">
        Washington
      </option>

      <option label="West Virginia" value="WV">
        West Virginia
      </option>

      <option label="Wisconsin" value="WI">
        Wisconsin
      </option>

      <option label="Wyoming" value="WY">
        Wyoming
      </option>
    </Select>
  );
};

export default SelectDropdown;
