"""
Windows compatibility fixes for async event loops
"""
import sys
import platform

def setup_event_loop_policy():
    """Set up the appropriate event loop policy for the platform"""
    if platform.system() == 'Windows':
        import asyncio
        # Use ProactorEventLoop on Windows for better subprocess support
        if sys.version_info >= (3, 8):
            try:
                from asyncio import WindowsProactorEventLoopPolicy
                asyncio.set_event_loop_policy(WindowsProactorEventLoopPolicy())
            except ImportError:
                pass

# Auto-setup on import
setup_event_loop_policy()

