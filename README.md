Программу можно запустить из корня приложения введя в консоль node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"

Чтение, запись и трансформация реализованы с помощью кастомных стримов. На вход получаем конфиг и входной и выходной файлы.

Если входной файл отсутствует входной поток читается из командной строки.Чтобы выйти из режима ввода в командную строку используется комбинация Ctrl + C

Если выходной файл отсутствует выходной поток пишется в командную строку.

Выполнены все условия кросс-чека на версии ноды 16.13.0 . В случае каких-либо вопросов или сложностей прошу написать в дискорд
