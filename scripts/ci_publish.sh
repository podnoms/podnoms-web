git ls-files --others --error-unmatch . >/dev/null 2>&1; ec=$?
if test "$ec" = 0; then
    echo 'Git needs commmit'
    elif test "$ec" = 1; then
    echo no untracked files
else
    echo error from ls-files
fi
