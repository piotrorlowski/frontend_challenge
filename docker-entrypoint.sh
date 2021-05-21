#!/bin/bash

set -e
source ~/.bashrc

if [[ $1 == "test" ]]; then
    shift
    cd .
    python manage.py test
fi
