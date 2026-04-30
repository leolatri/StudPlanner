import React, { useMemo, useState } from 'react';
import { colors } from '../../GeneralStyles';
import { useCalendar } from 'react-native-calendar-ui';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native';
import Arrow from '../Arrow';

interface CalendarDay {
    date: number;
    month: number;
    year: number;
}

interface CalendarDayWithDate extends CalendarDay {
    dateObj: Date;
}

interface CalendarWeek {
    weekId: string;
    days: (CalendarDayWithDate | null)[];
    startDate: Date;
}
interface CalendarProps {
    onDateSelect?: (date: Date) => void;
}

const Calendar = ({ onDateSelect }: CalendarProps) => {
    const {
        year,
        month,
        days: originalDays,
        selectDate,
        nextMonth,
        previousMonth,
        isDateSelected,
    } = useCalendar({
        onDateSelect: (date: Date) => {
            if (onDateSelect) onDateSelect(date);
        },
        initialSelectedDate: new Date(),
    });

    const [show, setShow] = useState(true);
    const toggleShow = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShow((prev) => !prev);
    };

    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    const weekHeaders = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    const getMondayOfWeek = (date: Date): Date => {
        const result = new Date(date);
        const day = date.getDay();
        const diff = day === 0 ? -6 : 1 - day;

        result.setDate(date.getDate() + diff);
        result.setHours(0, 0, 0, 0);

        return result;
    };

    const generateDateRange = (start: Date, end: Date): Date[] => {
        const dates: Date[] = [];
        const current = new Date(start);

        while (current <= end) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        return dates;
    };

    const calendarWeeks = useMemo((): CalendarWeek[] => {
        if (!originalDays || originalDays.length === 0) return [];

        const firstDayOfMonth = new Date(year, month, 1);
        const startDate = getMondayOfWeek(firstDayOfMonth);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 41);

        const existingDaysSet = new Set(
            originalDays.map((day) => `${day.year}-${day.month}-${day.date}`)
        );

        const allDatesInRange = generateDateRange(startDate, endDate);

        const allDays: CalendarDayWithDate[] = [];

        allDatesInRange.forEach(date => {
            const year = date.getFullYear();
            const month = date.getMonth();
            const dayDate = date.getDate();
            const key = `${year}-${month}-${dayDate}`;

            if (existingDaysSet.has(key)) {
                const existing = originalDays.find(
                    (d) => d.year === year && d.month === month && d.date === dayDate
                );
                if (existing) {
                    allDays.push({
                        ...existing,
                        dateObj: date
                    });
                }
            } else {
                allDays.push({
                    year,
                    month,
                    date: dayDate,
                    dateObj: date
                });
            }
        });

        const weeksMap = new Map<string, CalendarDayWithDate[]>();

        allDays.forEach(day => {
            const monday = getMondayOfWeek(day.dateObj);
            const weekId = monday.toISOString();
            if (!weeksMap.has(weekId)) {
                weeksMap.set(weekId, []);
            }
            weeksMap.get(weekId)!.push(day);
        });

        const weeks: CalendarWeek[] = Array.from(weeksMap.entries())
            .map(([weekId, days]) => {
                days.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
                const weekDays: (CalendarDayWithDate | null)[] = new Array(7).fill(null);

                days.forEach(day => {
                    const dayOfWeek = day.dateObj.getDay();
                    const index = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                    weekDays[index] = day;
                });

                return {
                    weekId,
                    days: weekDays,
                    startDate: new Date(weekId)
                };
            })
            .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

        return weeks;
    }, [originalDays, year, month]);

    const visibleWeeks = useMemo((): CalendarWeek[] => {
        return calendarWeeks.filter((week) =>
            week.days.some((day) => day && day.month === month)
        );
    }, [calendarWeeks, month]);

    const getCurrentWeek = (): CalendarWeek[] => {
        const today = new Date();
        let targetDate: Date | null = null;


        for (let i = 0; i < originalDays.length; i++) {
            const date = new Date(originalDays[i].year, originalDays[i].month, originalDays[i].date);
            if (isDateSelected(date)) {
                targetDate = date;
                break;
            } else {
                targetDate = new Date(year, month, 1);
            }
        }

        if (!targetDate) {
            targetDate = today;
        }

        const targetMonday = getMondayOfWeek(targetDate);
        const targetWeekId = targetMonday.toISOString();
        const targetWeek = calendarWeeks.find(w => w.weekId === targetWeekId);

        return targetWeek ? [targetWeek] : [];
    };

    const weeksToShow = show ? visibleWeeks : getCurrentWeek();

    return (
        <View style={st.container}>
            <View style={st.calendar}>
                <View style={st.calendar__header}>
                    <TouchableOpacity onPress={previousMonth}>
                        <Text style={st.calendar__navButton}>←</Text>
                    </TouchableOpacity>
                    <Text style={st.calendar__monthTitle}>{monthNames[month]} {year}</Text>
                    <TouchableOpacity onPress={nextMonth}>
                        <Text style={st.calendar__navButton}>→</Text>
                    </TouchableOpacity>
                </View>

                <View style={st.calendar__weekDays}>
                    {weekHeaders.map((day, index) => (
                        <Text key={day} style={[
                            st.calendar__weekDayText,
                            (index === 5 || index === 6) && st.weekendDay
                        ]}>
                            {day}
                        </Text>
                    ))}
                </View>

                <View style={st.calendar__daysGrid}>
                    {weeksToShow.map((week) => (
                        <View key={week.weekId} style={st.weekRow}>
                            {week.days.map((day, dayIndex) => {
                                if (!day) {
                                    return <View key={`empty-${week.weekId}-${dayIndex}`} style={st.dayCell} />;
                                }

                                const date = new Date(day.year, day.month, day.date);
                                const isSelected = isDateSelected(date);
                                const isCurrentMonth = day.month === month;

                                return (
                                    <TouchableOpacity
                                        key={`${week.weekId}-${dayIndex}`}
                                        style={[
                                            st.dayCell,
                                            !isCurrentMonth && st.otherMonthDay,
                                        ]}
                                        onPress={() => selectDate(date)}
                                    >
                                        <View style={[st.dayCircle, isSelected && st.selectedDay]}>
                                            <Text style={[st.dayText, isSelected && st.selectedDayText]}>
                                                {day.date}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ))}
                </View>
            </View>

            <Arrow
                rotate={(show ? -90 : 90)}
                color={colors.textWhite}
                style={st.arrow}
                func={toggleShow}
            />
        </View>
    );
};

const st = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 10
    },
    calendar: {
        padding: 16,
        width: '100%',
    },
    calendar__header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    calendar__navButton: {
        fontSize: 30,
        paddingHorizontal: 10,
        color: colors.textWhite,
        fontFamily: 'Montserrat-Regular',
    },
    calendar__monthTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.textWhite,
        fontFamily: 'Montserrat-Regular',
    },
    calendar__weekDays: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingBottom: 8,
    },
    calendar__weekDayText: {
        flex: 1,
        textAlign: 'center',
        fontWeight: '500',
        color: colors.generalBlue,
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
    },
    weekendDay: {
        color: '#ffffff',
    },
    calendar__daysGrid: {
        overflow: 'hidden',
    },
    weekRow: {
        flexDirection: 'row',
        width: '100%',
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
    },
    dayCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dayText: {
        fontSize: 16,
        color: colors.gray,
        fontFamily: 'Montserrat-Regular',
    },
    selectedDay: {
        backgroundColor: colors.generalBlue,
        borderRadius: 100,
    },
    selectedDayText: {
        color: 'white',
        fontWeight: '600',
        fontFamily: 'Montserrat-Regular',
    },
    otherMonthDay: {
        opacity: 0.3
    },
    arrow: {
        width: 25,
        height: 25,
    },
});

export default Calendar;