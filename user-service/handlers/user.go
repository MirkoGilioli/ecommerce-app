package handlers

import (
    "encoding/json"
    "net/http"
    "strconv"
	"github.com/gorilla/mux"
)

// User represents a user in the system
type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

// Mock user data
var users = []User{
    {ID: 1, Name: "Alice", Email: "alice@example.com"},
    {ID: 2, Name: "Bob", Email: "bob@example.com"},
}

// GetUsers returns all users
func GetUsers(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

// CreateUser creates a new user
func CreateUser(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    var newUser User
    json.NewDecoder(r.Body).Decode(&newUser)
    newUser.ID = len(users) + 1
    users = append(users, newUser)
    json.NewEncoder(w).Encode(newUser)
}

// GetUserByID returns a user by their ID
func GetUserByID(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    // Get the "id" from the URL path variables
    vars := mux.Vars(r)
    idStr := vars["id"]

    // Convert the ID from string to integer
    id, err := strconv.Atoi(idStr)
    if err != nil {
        http.Error(w, "Invalid ID", http.StatusBadRequest)
        return
    }

    // Loop through the users to find the one with the given ID
    for _, user := range users {
        if user.ID == id {
            json.NewEncoder(w).Encode(user)
            return
        }
    }

    // If user not found, return a 404 error
    http.Error(w, "User not found", http.StatusNotFound)
}