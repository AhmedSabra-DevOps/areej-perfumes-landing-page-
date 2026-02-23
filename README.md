# Linux Links and Archive Assignment

## 1. Create Original File
echo "This is a sample file for Linux assignment." > original.txt

## 2. Create Hard Link
ln original.txt hardlink.txt
ls -li original.txt hardlink.txt

## 3. Create Relative Symbolic Link
ln -s original.txt symlink.txt
ls -l symlink.txt

## 4. Create Archive
tar -cvf archive.tar original.txt hardlink.txt symlink.txt
tar -tvf archive.tar

## 5. Compress Archive
gzip -k archive.tar
ls -lh archive.tar archive.tar.gz
# bash-task-manager
