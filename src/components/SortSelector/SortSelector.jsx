import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const SortSelector = ({ value, setValue }) => {
  return (
    <FormControl sx={{ minWidth: 200, mb: 2 }}>
      <InputLabel>Sort by</InputLabel>
      <Select
        value={value}
        label="Sort by"
        onChange={(e) => setValue(e.target.value)}
      >
        <MenuItem value="alphabet">Alphabetical</MenuItem>
        <MenuItem value="count">Count</MenuItem>
        <MenuItem value="price">Price</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelector;
