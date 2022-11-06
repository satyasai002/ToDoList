import React, { FC, ChangeEvent, useState } from "react";
import { ITask } from "./interfaces";
import { HiTrash } from "react-icons/hi";
import { Box, Button, Flex, Text, Badge, Checkbox } from "@chakra-ui/react";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const doneTask = (event: ChangeEvent<HTMLInputElement>): void => {
    setIsDone(!isDone);
  };
  return (
    <Box m="8" w="100%">
      <Flex  gap={4} flexDirection="row" alignItems="center">
        <Checkbox onChange={doneTask}></Checkbox>
        <Text
          w="50%"
          fontWeight={isDone ? "100" : "400"}
          textDecoration={isDone ? "line-through" : " "}
        >
          {task.taskName}
        </Text>
        <Box w="25%" >
          <Badge colorScheme={task.deadline === "Low" ? "green" : task.deadline === "Middle" ? "orange" : "red"}>{task.deadline}</Badge>
        </Box>
        <Button
          color="black"
          backgroundColor="tomato"
          p="2px"
          onClick={() => {
            completeTask(task.taskName);
          }}
        >
          <HiTrash size={16} />
        </Button>
      </Flex>
    </Box>
  );
};

export default TodoTask;
