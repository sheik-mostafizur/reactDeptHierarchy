import React, {useEffect, useState} from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Checkbox,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

interface DepartmentData {
  department: string;
  sub_departments: Array<string>;
}

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [checked, setChecked] = useState<string[]>([]);
  const [departmentData, setDepartmentData] = useState<DepartmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get<DepartmentData[]>("departmentData.json")
      .then((response) => {
        setDepartmentData(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleExpand = (department: string) => () => {
    setExpanded((prevExpanded) =>
      prevExpanded === department ? false : department
    );
  };

  const isDepartmentChecked = (department: string) => {
    const subDepartments = departmentData.find(
      (item) => item.department === department
    )?.sub_departments;
    return (
      subDepartments &&
      subDepartments.every((subDep) => checked.includes(subDep))
    );
  };

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <List>
      {departmentData.map((item) => (
        <div key={item.department}>
          <ListItem button onClick={handleExpand(item.department)}>
            <Checkbox
              edge="start"
              checked={isDepartmentChecked(item.department)}
              indeterminate={
                checked.some((dep) => item.sub_departments.includes(dep)) &&
                !isDepartmentChecked(item.department)
              }
              onChange={handleToggle(item.department)}
            />
            <ListItemText
              primary={`${item.department} (${item.sub_departments.length})`}
            />
          </ListItem>
          <Collapse
            in={expanded === item.department}
            timeout="auto"
            unmountOnExit>
            <List component="div" disablePadding>
              {item.sub_departments.map((subDep) => (
                <ListItem key={subDep} button sx={{pl: 4}}>
                  <Checkbox
                    edge="start"
                    checked={checked.includes(subDep)}
                    onChange={handleToggle(subDep)}
                  />
                  <ListItemText primary={subDep} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
      {checked.length > 0 && (
        <Box mt={2}>
          <Typography variant="body1">
            <b>Selected Departments/Sub-departments:</b> {checked.join(", ")}
          </Typography>
        </Box>
      )}
    </List>
  );
};

export default DepartmentList;
