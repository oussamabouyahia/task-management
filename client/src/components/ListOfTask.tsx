import { useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Checkbox,
  Input,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
type TaskType = {
  _id: number;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
};
type TasksProps = {
  list: TaskType[];
  setList: (value: TaskType[]) => void;
};
const ListOfTask = ({ list, setList }: TasksProps) => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/list")
      .then((res) => setList(res.data.tasks))
      .catch((err) => console.log(err.message));
  }, []);
  const handleStatus = (id: number) => {
    //set the list of tasks when click on the complete box
    const newList = list.map((e) => {
      if (e._id === id) {
        e.completed = !e.completed;
        return e;
      } else return e;
    });
    setList(newList);
  };
  const handleNewDeadline = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    //set the list of tasks when a new deadline setted

    const newList = list.map((e) => {
      if (e._id === id) {
        e.due_date = event.target.value;
        return e;
      } else return e;
    });
    setList(newList);
  };
  const updateTask = (id: number) => {
    const targetTask = list.find((e) => e._id === id);
    targetTask
      ? axios
          .put(`http://localhost:3000/list/${id}`, targetTask)
          .then(() => alert("task updated successfully"))
          .catch((err) => alert(err.message))
      : alert("you should select a valid task");
  };
  const deleteTask = (id: number) => {
    axios
      .delete(`http://localhost:3000/list/${id}`)
      .then(() => {
        location.reload();
        alert("task deleted successfully");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <TableContainer style={{ marginTop: "5%" }}>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>table of tasks</TableCaption>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Due Date</Th>
            <Th>new deadline</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((e) => (
            <Tr key={e._id}>
              <Td>{e.title}</Td>
              <Td>{e.description}</Td>
              <Td>
                {e.due_date
                  .split("")
                  .filter((_, i) => i < 10)
                  .join("")}
              </Td>
              <Td>
                <Input
                  placeholder="Select new due date"
                  type="date"
                  onChange={(event) => handleNewDeadline(event, e._id)}
                />
              </Td>
              <Td>
                <Checkbox
                  colorScheme="blue"
                  defaultChecked={e.completed}
                  onChange={() => handleStatus(e._id)}
                >
                  {e.completed ? "completed" : "not Completed"}
                </Checkbox>
              </Td>
              <Td>
                <Button colorScheme="blue" onClick={() => updateTask(e._id)}>
                  save update
                </Button>
              </Td>
              <Td>
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Call Sage"
                  fontSize="20px"
                  icon={<DeleteIcon />}
                  onClick={() => deleteTask(e._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ListOfTask;
