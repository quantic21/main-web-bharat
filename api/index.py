import sys
import os
from pathlib import Path

# Add backend folder to sys.path so server.py and modules can be imported
backend_dir = Path(__file__).parent.parent / "backend"
sys.path.append(str(backend_dir))

from server import app

# Export app for Vercel Serverless Function
__all__ = ["app"]
