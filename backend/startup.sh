#!/bin/bash
python3 -m venv venv
source $(pwd)/venv/bin/activate

python3 -m pip install -r requirements.txt

python3 easychef/manage.py migrate
