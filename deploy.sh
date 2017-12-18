echo running as mpoapostolis;
sudo su mpoapostolis;
echo remove old build;
rm -rf build;
echo pull the new origin;
git pull;
echo build new static files;
npm run build;
echo sync nginx static files;
sudo rsync -az build/ /var/www/html/
echo done;
