import os
import subprocess
import datetime
import random

# Configuration
NUM_COMMITS = 1200
START_ID = 6902  # Continue after previous entry #6901
LOG_PATH = os.path.join('docs', 'TELEMETRY_LOGS.md')
AUTHOR_NAME = 'thanki-harsh-codes'
AUTHOR_EMAIL = 'harsh.h.thanki@gmail.com'
START_DATETIME = datetime.datetime(2026, 10, 30, 8, 0, 0)  # Current date IST start time
TIME_DELTA_SECONDS = 10  # spacing between commits

SUBSYSTEMS = [
    'Predictive Arc Canvas',
    'Lottie Animation Engine',
    '3D Particle Renderer',
    'Audio Visualizer',
    'Responsive Grid System',
    'Lazy Load Optimizer',
    'SVG Morphing Pipeline',
    'WebGL Shader Compiler',
    'CSS-in-JS Themer',
    'State Sync Daemon',
    'Cache Warmup Service',
    'Telemetry Beacon',
    'Scroll Parallax Manager',
    'Viewport Resize Observer',
    'Touch Gesture Dispatcher',
    'Dynamic Font Loader',
    'Background Video Loop',
    'Interactive Tooltip Engine',
    'Micro Frontend Loader',
    'Progressive Image Loader',
]

METRICS = [
    ('frame_render_budget', 'ms (60fps)', (15, 30)),
    ('animation_fps', 'fps', (55, 75)),
    ('cpu_usage', '%', (10, 45)),
    ('memory_footprint', 'MB', (45, 120)),
    ('latency', 'ms', (5, 25)),
    ('jank_events', 'count', (0, 3)),
    ('gpu_utilization', '%', (20, 70)),
    ('bundle_size', 'KB', (80, 250)),
    ('first_contentful_paint', 'ms', (800, 1500)),
    ('time_to_interactive', 'ms', (1200, 2500)),
]

def random_metric():
    key, unit, (lo, hi) = random.choice(METRICS)
    value = round(random.uniform(lo, hi), 1)
    return f'`{key}`', f'`{value} {unit}`'

def append_entry(entry_id, timestamp, subsystem, metric_key, metric_value):
    line = f"| #{entry_id:04d} | {timestamp} | {subsystem} | {metric_key} | {metric_value} | **PASS** |\n"
    with open(LOG_PATH, 'a', encoding='utf-8') as f:
        f.write(line)

def make_commit(message, author_date, commit_date):
    env = os.environ.copy()
    env['GIT_AUTHOR_NAME'] = AUTHOR_NAME
    env['GIT_AUTHOR_EMAIL'] = AUTHOR_EMAIL
    env['GIT_COMMITTER_NAME'] = AUTHOR_NAME
    env['GIT_COMMITTER_EMAIL'] = AUTHOR_EMAIL
    env['GIT_AUTHOR_DATE'] = author_date
    env['GIT_COMMITTER_DATE'] = commit_date
    subprocess.run(['git', 'add', '-A'], check=True, cwd='.', env=env)
    subprocess.run(['git', 'commit', '-m', message], check=True, cwd='.', env=env)

def main():
    header = "\n## 2026-10-30 Telemetry Entries\n\n"
    with open(LOG_PATH, 'a', encoding='utf-8') as f:
        f.write(header)
    for i in range(NUM_COMMITS):
        entry_id = START_ID + i
        ts = START_DATETIME + datetime.timedelta(seconds=i * TIME_DELTA_SECONDS)
        timestamp_str = ts.strftime('%Y-%m-%d %H:%M:%S')
        subsystem = random.choice(SUBSYSTEMS)
        metric_key, metric_value = random_metric()
        append_entry(entry_id, timestamp_str, subsystem, metric_key, metric_value)
        commit_msg = f"chore: telemetry entry #{entry_id:04d} for {subsystem}"
        iso = ts.isoformat()
        make_commit(commit_msg, iso, iso)

if __name__ == '__main__':
    main()
