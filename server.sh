#!/bin/bash
cmd="$@"

new_project_if_folder_empty() {
    num_files=$(find ./ -maxdepth 1 -mindepth 1 | wc -l)

    if [ "${num_files}" == "0" ]; then
        echo "No project files found! Starting a new on with 'ng new'"
        ng new my-ng2-app
    fi
}

nmp_install_if_package_json() {
    if [ -f 'package.json' ]; then
        echo "Running npm install..."
        yarn install
    else
        echo "No 'package.json' inside $(pwd). Skipping 'npm install'."
    fi
}

if [ "${cmd}" == "default" ]; then
    ng serve --host=0.0.0.0 --environment=prod --public-host podnoms.com www.podnoms.com
else
    echo "Running the command '${cmd}'..."
    exec $cmd
fi
