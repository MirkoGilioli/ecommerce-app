package main

import (
    "log"
    "net/http"

    "github.com/gorilla/mux"
    "user-service/handlers"
)

// corsMiddleware is a middleware function that sets CORS headers
func corsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*") // Allow all origins
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST") // Allowed methods
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type") // Allowed headers

        // Handle preflight requests
        if r.Method == http.MethodOptions {
            return // Exit for preflight requests
        }

        next.ServeHTTP(w, r) // Call the next handler
    })
}

func main() {
    // Create a new router
    router := mux.NewRouter()

    // Define routes for user operations
    router.HandleFunc("/users", handlers.GetUsers).Methods("GET")
    router.HandleFunc("/users", handlers.CreateUser).Methods("POST")
    router.HandleFunc("/users/{id}", handlers.GetUserByID).Methods("GET")

    // Start the server with CORS middleware
    log.Println("User service is running on port 5003")
    log.Fatal(http.ListenAndServe(":5003", corsMiddleware(router)))
}
