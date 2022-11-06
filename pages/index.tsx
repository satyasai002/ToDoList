import React, { FC, ChangeEvent, useState } from "react";
import TodoTask from "../componets/List";
import { ITask } from "../componets/interfaces";
import {Input, Button,Box, Center,FormControl,FormHelperText,FormErrorMessage, Flex, Container,Text,Select} from "@chakra-ui/react"

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDealine] = useState<string>("Low");
  const [isEmptyTask,setIsEmptyTask] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
      setIsEmptyTask(false)
    } else {
      setDealine(String(event.target.value));
    }
  };

  const addTask = (): void => {
    if(task === ""){
      setIsEmptyTask(true);
    }
    else{
      const newTask = { taskName: task, deadline: deadline };
      setTodoList([...todoList, newTask]);
      setTask("");
      setDealine("Low");
    }
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  };

  return (
    <Box>
      <Center mt={4}>
        <Text fontFamily={"'poppins'"} fontSize={50} fontWeight={500}>
          To Do List
        </Text>
      </Center>
      <Container
        maxW="container.md"
        minH="50vh"
        borderWidth={3}
        borderRadius="38px"
        boxShadow="lg"
        mt={8}
      >
        <Flex flexDirection="column" mt={4} p={4}>
          <Flex flexDirection="row" gap={4}>
            <Flex direction="column" w="100%" gap={2}>
              <Text fontSize="20px">Task</Text>
              <FormControl isInvalid={isEmptyTask}>
                <Input
                  type="text"
                  placeholder="Enter your Task here ..."
                  name="task"
                  value={task}
                  onChange={handleChange}
                />
                {isEmptyTask && (
                  <FormErrorMessage>Enter any task to add</FormErrorMessage>
                )}
              </FormControl>
            </Flex>
            <Flex fontSize="20px" direction="column" w="30%" gap={2}>
              <Text>Priority</Text>
              <FormControl>
                <Select value={deadline} onChange={handleChange}>
                  <option value="Low">Low</option>
                  <option value="Middle">Middle</option>
                  <option value="High">High</option>
                </Select>
              </FormControl>
            </Flex>
            <Button onClick={addTask} mt="9" p={5}>
              Add Task
            </Button>
          </Flex>
          <Box>
            <Box my="8" w="100%">
              <Flex
                gap={8}
                flexDirection="row"
                borderRadius={4}
                backgroundColor="gray.200"
                alignItems="center"
              >
                <Text w="50%" ml={10}>
                  Task
                </Text>
                <Text w="25%">Priority</Text>
                <Text>Action</Text>
              </Flex>
            </Box>
            {todoList.map((task: ITask, key: number) => {
              return (
                <TodoTask key={key} task={task} completeTask={completeTask} />
              );
            })}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default App;
