// db.js - simple in-memory database simulation

// Connection pool (just an array of connections)
let pool = [];

// Simulated connect function
export function connect(user = "defaultUser") {
  const conn = { id: Date.now(), user, status: "connected" };
  pool.push(conn);
  console.log(`[DB] Connected as ${user}, id=${conn.id}`);
  return conn;
}

// Disconnect function
export function disconnect(conn) {
  pool = pool.filter(c => c.id !== conn.id);
  console.log(`[DB] Disconnected id=${conn.id}`);
}

// Show pool status
export function showConnections() {
  console.log("[DB] Active connections:", pool);
}


// Query function simulates latency
export function query(conn, sql) {
  return new Promise((resolve, reject) => {
    if (!pool.find(c => c.id === conn.id)) {
      return reject(new Error("Invalid connection"));
    }
    console.log(`[DB] Executing query on ${conn.user}: ${sql}`);
    setTimeout(() => {
      resolve({ rows: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }] });
    }, 500); // half a second delay
  });
}


// Example usage (uncomment to test in Node):
/*
const conn = connect("testUser");
showConnections();
query(conn, "SELECT * FROM users").then(res => {
  console.log("Query result:", res);
  disconnect(conn);
  showConnections();
});
*/


