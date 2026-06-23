# SupportFlow Visual Builder

A visual decision tree editor for building and testing chatbot conversation flows. Built for the AmaliTech DEG Project Challenge.

## Live Demo

https://amali-tech-deg-project-based-challe-two.vercel.app/

## Design File

[View Figma Design System](https://www.figma.com/design/KpRI5kOI9EnhZHB7c1l7h0/SupportFlow-Visual-Builder?node-id=19-2&t=NPjjqAqtLmiT7OdW-1)

## Features

- Visual Graph — Nodes are rendered absolutely on a canvas using x/y coordinates from JSON data, connected by SVG bezier curves
- Edit Panel — Click any node to open an edit panel where you can update the question text and answer options in real time
- Preview Mode — A chat interface that lets you test drive the bot as a real customer, traversing the graph by selecting answers
- Drag to Reposition — Nodes can be dragged to any position on the canvas; SVG connectors update automatically
- Add Node — Add new question nodes directly from the toolbar

## Wildcard Feature: Drag to Reposition Nodes

The original spec had no way to reorganize the canvas layout. As flows grow larger, nodes overlap and become hard to read. I added drag-and-drop repositioning so non-technical managers can organize their flow visually without touching any data. This directly improves the editor experience and reduces confusion when building complex support flows.

## Tech Stack

- React 19
- Vite
- Custom SVG connector logic (no react-flow or graph libraries)
- No component libraries (no Bootstrap, Material UI, etc.)

## Setup Instructions

cd fullstack/SupportFlow-Visual-Builder
npm install
npm run dev

Open http://localhost:5173 in your browser.

## How SVG Connectors Work

Each node has an x/y position from the JSON data. The Connectors component loops through all nodes and their options, calculates the bottom-center of the parent node and the top-center of the child node, then draws a cubic bezier curve between them using SVG path elements. When nodes are dragged, the positions update in React state which automatically re-renders the SVG paths.

## Project Structure

src/
- data/flow_data.json
- components/Node.jsx
- components/Connectors.jsx
- components/EditPanel.jsx
- components/PreviewMode.jsx
- App.jsx
- App.css