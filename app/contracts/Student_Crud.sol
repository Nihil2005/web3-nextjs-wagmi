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

    // Event to emit when a student is updated
    event StudentUpdated(uint256 index, string name, uint256 age, string grade);

    // Event to emit when a student is deleted
    event StudentDeleted(uint256 index);

    // Function to add a new student
    function addStudent(
        string memory _name,
        uint256 _age,
        string memory _grade
    ) public {
        students.push(Student(_name, _age, _grade));
        emit StudentAdded(_name, _age, _grade);
    }

    // Function to update an existing student's details
    function updateStudent(
        uint256 _index,
        string memory _name,
        uint256 _age,
        string memory _grade
    ) public {
        require(_index < students.length, "Student does not exist");
        students[_index] = Student(_name, _age, _grade);
        emit StudentUpdated(_index, _name, _age, _grade);
    }

    // Function to delete a student
    function deleteStudent(uint256 _index) public {
        require(_index < students.length, "Student does not exist");
        students[_index] = students[students.length - 1]; // Move the last student to the deleted position
        students.pop(); // Remove the last student
        emit StudentDeleted(_index);
    }

    // Function to retrieve student details by index
    function getStudent(uint256 _index)
        public
        view
        returns (
            string memory name,
            uint256 age,
            string memory grade
        )
    {
        require(_index < students.length, "Student does not exist");
        Student storage student = students[_index];
        return (student.name, student.age, student.grade);
    }

    // Function to get the total number of students
    function getStudentCount() public view returns (uint256) {
        return students.length;
    }
}
