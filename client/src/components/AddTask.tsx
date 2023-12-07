import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

const AddTask = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  const isErrorTitle = input.title.length < 3;
  const isErrorDescription = input.description.length < 10;
  const isErrorDate = input.due_date === "";
  const addNewTask = () => {
    axios
      .post("http://localhost:3000/add", input)
      .then(() => {
        alert("task added succesfully check list page");
        location.reload();
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div style={{ marginTop: "10%" }}>
      <h1>Add New Task</h1>
      <div style={{ marginTop: "5%" }}>
        <FormControl isInvalid={isErrorTitle}>
          <FormLabel>Title of the task</FormLabel>
          <Input
            type="text"
            value={input.title}
            onChange={(e) =>
              setInput((prev) => {
                return { ...prev, title: e.target.value };
              })
            }
          />
          {!isErrorTitle ? (
            <FormHelperText>enter a title for your task</FormHelperText>
          ) : (
            <FormErrorMessage>
              required title for three characters{" "}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isErrorDescription}>
          <FormLabel>Description </FormLabel>
          <Input
            type="text"
            value={input.description}
            onChange={(e) =>
              setInput((prev) => {
                return { ...prev, description: e.target.value };
              })
            }
          />
          {!isErrorDescription ? (
            <FormHelperText> enter your task description</FormHelperText>
          ) : (
            <FormErrorMessage>
              enter a description with minimum ten characters
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isErrorDate}>
          <FormLabel>Deadline </FormLabel>
          <Input
            type="date"
            value={input.due_date}
            onChange={(e) =>
              setInput((prev) => {
                return { ...prev, due_date: e.target.value };
              })
            }
          />
          {!isErrorDate ? (
            <FormHelperText>enter a due date </FormHelperText>
          ) : (
            <FormErrorMessage>deadline is required.</FormErrorMessage>
          )}
        </FormControl>
        <Button
          colorScheme="teal"
          size="md"
          isDisabled={isErrorDate || isErrorDescription || isErrorTitle}
          onClick={addNewTask}
        >
          Submit Task
        </Button>
      </div>
    </div>
  );
};

export default AddTask;
