// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentManagement {
    // Struct to store student details
    struct Student {
        string name;
        uint256 age;
        string grade;
    }

    // Array to store all students
    Student[] public students;

    // Event to emit when a student is added
    event StudentAdded(string name, uint256 age, string grade);

    // Function to add a student
    function addStudent(
        string memory _name,
        uint256 _age,
        string memory _grade
    ) public {
        // Add the student to the array
        students.push(Student({name: _name, age: _age, grade: _grade}));

        // Emit the event
        emit StudentAdded(_name, _age, _grade);
    }

    // Function to get the total number of students
    function getStudentCount() public view returns (uint256) {
        return students.length;
    }

    // Function to get a student's details by index
    function getStudent(uint256 index)
        public
        view
        returns (
            string memory name,
            uint256 age,
            string memory grade
        )
    {
        require(index < students.length, "Student does not exist");
        Student storage student = students[index];
        return (student.name, student.age, student.grade);
    }
}
