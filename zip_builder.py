import os
import zipfile

# Complete project manifest containing all 38 production files from Parts 1-6
project_files = {
    "render.yaml": """...insert text from Part 1...""",
    "build_pipeline.js": """...insert text from Part 1...""",
    "backend/package.json": """...insert text from Part 2...""",
    "backend/.env": """...insert text from Part 2...""",
    "backend/server.js": """...insert text from Part 2...""",
    "backend/config/firebase.js": """...insert text from Part 2...""",
    "backend/middleware/auth.js": """...insert text from Part 2...""",
    "backend/models/User.js": """...insert text from Part 3...""",
    "backend/models/Attendance.js": """...insert text from Part 3...""",
    "backend/models/Material.js": """...insert text from Part 3...""",
    "backend/models/Assignment.js": """...insert text from Part 3...""",
    "backend/models/Mark.js": """...insert text from Part 3...""",
    "backend/models/Paper.js": """...insert text from Part 3...""",
    "backend/routes/auth.js": """...insert text from Part 4...""",
    "backend/routes/attendance.js": """...insert text from Part 4...""",
    "backend/routes/materials.js": """...insert text from Part 4...""",
    "backend/routes/assignments.js": """...insert text from Part 4...""",
    "backend/routes/marks.js": """...insert text from Part 4...""",
    "backend/routes/papers.js": """...insert text from Part 4...""",
    "backend/routes/chatbot.js": """...insert text from Part 4...""",
    "backend/seed.js": """...insert text from Part 4...""",
    "backend/stress_test.js": """...insert text from Part 4...""",
    "frontend/package.json": """...insert text from Part 5...""",
    "frontend/vite.config.js": """...insert text from Part 5...""",
    "frontend/tailwind.config.js": """...insert text from Part 5...""",
    "frontend/postcss.config.js": """...insert text from Part 5...""",
    "frontend/vercel.json": """...insert text from Part 5...""",
    "frontend/index.html": """...insert text from Part 5...""",
    "frontend/src/index.css": """...insert text from Part 5...""",
    "frontend/src/main.jsx": """...insert text from Part 5...""",
    "frontend/src/App.jsx": """...insert text from Part 5...""",
    "frontend/src/pages/AuthPage.jsx": """...insert text from Part 6...""",
    "frontend/src/pages/Chat.jsx": """...insert text from Part 6...""",
    "frontend/src/pages/StudentGrades.jsx": """...insert text from Part 6...""",
    "frontend/src/pages/TeacherUpload.jsx": """...insert text from Part 6...""",
    "frontend/src/pages/AdminSupportChat.jsx": """...insert text from Part 6...""",
    "frontend/src/pages/AdminAnalytics.jsx": """...insert text from Part 6...""",
    "frontend/src/components/AIAssistant.jsx": """...insert text from Part 6..."""
}

zip_name = "smart-student-hub.zip"
print(f"📦 Compiling package target pipeline: '{zip_name}'...")

try:
    with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file_path, content in project_files.items():
            zipf.writestr(file_path, content.strip())
            print(f"  ⚡ Packed asset context node: {file_path}")
    print(f"\n✅ ZIP CREATION COMPLETE!")
except Exception as e:
    print(f"❌ Failed to archive file array: {e}")
