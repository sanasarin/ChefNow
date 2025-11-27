#create virtual environment
python3.10 -m venv venv

#activate virtual environment
source $(pwd)/venv/bin/activate

#install backend dependencies
python3.10 -m pip install -r backend/requirements.txt

#set backend migration
python3.10 backend/easychef/manage.py migrate

#install frontend dependencies
npm --prefix frontend install

echo "Startup complete"
