// src/data/mockOrders.js
// This file simulates test data for orders
// In the real project this data comes from the API

export const STATUSES = {
  PENDING:    { label: "Pending",    color: "gold"  },
  PREPARING:  { label: "Preparing",  color: "blue"  },
  ON_THE_WAY: { label: "On the way", color: "cyan"  },
  DELIVERED:  { label: "Delivered",  color: "green" },
  CANCELLED:  { label: "Cancelled",  color: "red"   },
};

const restaurants = ["Burger Palace","Pizza Hub","Sushi World","Shawarma King","Healthy Bowl"];
const areas       = ["The Pearl","West Bay","Al Sadd","Lusail","Msheireb"];
const names       = ["Ahmed Al-Khalid","Sara Mohammed","Omar Hussain","Layla Al-Farsi","Khalid Nasser","Nour Jaber"];

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// Fixed data (seed) is not refreshed every time
export const mockOrders = Array.from({ length: 48 }, (_, i) => {
  const statusKeys  = Object.keys(STATUSES);
  const statusIndex = i % statusKeys.length;
  const createdAt   = new Date(Date.now() - (48 - i) * 18 * 60000);
  return {
    id:         `ORD-${String(1000 + i).padStart(4, "0")}`,
    customer:   names[i % names.length],
    restaurant: restaurants[i % restaurants.length],
    area:       areas[i % areas.length],
    items:      randomInt(1, 6),
    total:      randomInt(30, 250),
    status:     statusKeys[statusIndex],
    createdAt:  createdAt.toISOString(),
    eta:        randomInt(10, 45),
  };
});

// Emulation API — Returns data after 400ms
export function fetchOrders() {
  return new Promise((resolve) =>
    setTimeout(() => resolve([...mockOrders]), 400)
  );
}

export function fetchStats() {
  const total     = mockOrders.length;
  const delivered = mockOrders.filter((o) => o.status === "DELIVERED").length;
  const pending   = mockOrders.filter((o) => o.status === "PENDING").length;
  const revenue   = mockOrders.reduce((s, o) => s + o.total, 0);

  // Weekly data for Chart
  const weekly = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day, i) => ({
    day,
    orders:  randomInt(18, 60) + i * 2,
    revenue: randomInt(800, 2400) + i * 100,
  }));

  return new Promise((resolve) =>
    setTimeout(() => resolve({ total, delivered, pending, revenue, weekly }), 300)
  );
}
